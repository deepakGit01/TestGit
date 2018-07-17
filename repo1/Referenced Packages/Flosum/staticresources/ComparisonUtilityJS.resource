var sourcedata = [];
var targetdata = [];
var sourceSnapshot;
var targetSnapshot;
var metadataType;
var sourceIds = [];
var targetIds = [];

function fillAttachments() 
{
    sourcedata = [];
    targetdata = [];
    sourceIds = [];
    targetIds = [];
    sourceSnapshot = $("select[id$='sourceSnap'] option:selected").val();
    targetSnapshot = $("select[id$='targetSnap'] option:selected").val();
    metadataType = $("select[id$='metadatatype'] option:selected").text();
    if(sourceSnapshot != undefined && targetSnapshot != undefined && metadataType != undefined) 
    {	
        if(sourceSnapshot != '' && targetSnapshot != '' && metadataType != '--None--')
        {
            show();
            getZipIds();
        }
    }
}

function handleSourceAttachments(r,e) 
{
    if(e.status) 
    {
    	sourceIds.remove(r.Id);
		if(r.basedata != null )
		{
			sourcedata.push(""+r.basedata);
		}
		if(r.index == r.total)
		{
			if(sourceIds.length > 0)
			{
				for(var index in sourceIds)
				{
					if(index < 5 && index < sourceIds.length)
					{
						if(sourceIds.length > 5)
						{
							var tempId = ""+sourceIds[index];
							getSourceAttachments(tempId,index,4);
						}
						else
						{
							var tempId = ""+sourceIds[index];
							getSourceAttachments(tempId,index,(sourceIds.length -1));
						}
						
					}		
				}
			}
			else
			{
				getZipIdsTarget();
			}
		}
    } 
    else 
    {
        showMessage(e.message);	
    }
}

function handleTargetAttachments(r,e) 
{
    if(e.status) 
    {
    	targetIds.remove(r.Id);
		if(r.basedata != null )
		{
			targetdata.push(""+r.basedata);
		}
		if(r.index == r.total)
		{
			if(targetIds.length > 0)
			{
				for(var index in targetIds)
				{
					if(index < 5 && index < targetIds.length)
					{
						if(targetIds.length > 5)
						{
							var tempId = ""+targetIds[index];
							getSourceAttachments(tempId,index,4);
						}
						else
						{
							var tempId = ""+targetIds[index];
							getSourceAttachments(tempId,index,(targetIds.length -1));
						}
						
					}		
				}
			}
			else
			{
				fullComparison();
			}
		}
    } 
    else 
    {
        showMessage(e.message);
    }
}

function handleZipIds(r,e) 
{
	if(e.status && r) 
	{
		for(var i in r)
		{
			if(i < r.length) 
			{
				sourceIds.push(r[i]);
			}
		}
		if(sourceIds.length > 0)
		{
			for(var index in sourceIds)
			{
				if(index < 5 && index < sourceIds.length)
				{
					if(sourceIds.length > 5)
					{
						var tempId = ""+sourceIds[index];
						getSourceAttachments(tempId,index,4);
					}
					else
					{
						var tempId = ""+sourceIds[index];
						getSourceAttachments(tempId,index,(sourceIds.length -1));
					}
				}	
			}
		}
		else
		{
			var snapName = $("select[id$='sourceSnap'] option:selected").text();
			showMessage('There are no  '+metadataType+' in Snapshot \''+snapName+'\'. Nothing to compare.');
			fullComparison();
		}
	}
	else
	{
		showMessage(e.message);	
	} 
}

function handleZipIdsTarget(r,e) 
{ 
    if(e.status && r) 
    {
    	for(var i in r)
		{
			if(i < r.length) 
			{
				targetIds.push(r[i]);
			}
		}
		if(targetIds.length > 0)
		{
			for(var index in targetIds)
			{
				if(index < 5 && index < targetIds.length)
				{
					if(targetIds.length > 5)
					{
						var tempId = ""+targetIds[index];
						getTargetAttachments(tempId,index,4);
					}
					else
					{
						var tempId = ""+targetIds[index];
						getTargetAttachments(tempId,index,(targetIds.length -1));
					}
				}	
			}
		}
		else
		{
			var snapName = $("select[id$='targetSnap'] option:selected").text();
            showMessage('There are no  '+metadataType+' in Snapshot \''+snapName+'\'. Nothing to compare.');
            fullComparison();
		}
    } 
    else
    {
        showMessage(e.message);	
    }
}

function showDifference() 
{
		show();
		var compareDiff = $("input[id$='comparediff']").is(':checked');
		s = $(".source");
	    t = $(".target");
	    var re = new RegExp("!!##!!##!!", 'g');
	    var mmap = new Object();
	    mmap['CustomField'] = true;
	    mmap['CompactLayout'] = true;
	    mmap['WebLink'] = true;
	    mmap['RecordType'] = true;
	    mmap['ListView'] = true;
	    mmap['FieldSet'] = true;
	    mmap['AssignmentRule'] = true;
	    mmap['AutoResponseRule'] = true;
	    mmap['ValidationRule'] = true;
	    mmap['WorkflowTask'] = true;
		mmap['WorkflowOutboundMessage'] = true;
		mmap['WorkflowFieldUpdate'] = true;
		mmap['WorkflowAlert'] = true;
		mmap['WorkflowRule'] = true;
	    if(metadataType != 'CustomLabel' && mmap[metadataType] == undefined)
	    {
		    $.each(s, function( index, value ) 
		    { 
		       sid = $(value).attr("id");
			   var tes ="#target-"+sid;
			   tid = $(tes).attr("id");
			   
			   if(tid != undefined)
			   {
			       var sorceval  = $(value).val();
			       var targetval = $(tes).val();
			       if(sorceval == undefined || targetval == undefined || sorceval == '' || targetval == ''|| sorceval == '-' || targetval == '-')
			       {
			           $(value).parent().parent().addClass('red');
			       }
			       else if(sorceval == targetval)
			       {  
			           sorceval = sorceval.replace(re, ' ');
			           targetval = targetval.replace(re, ' ');
			           //in workflow case change the path of file
			           if(metadataType == 'Workflow')
			           {
			               if(sorceval.indexOf('Workflow/') > -1)
			               {
			                   sorceval = sorceval.replace('Workflow/','workflows/');
			               }
			               if(targetval.indexOf('Workflow/') > -1)
			               {
			                   targetval = targetval.replace('Workflow/','workflows/');
			               }
			           }
			           var scomp = null;
			           var tcomp = null;
			           if(sourcedata != undefined)
			           {
			               if(sourcedata.length > 0 )
			               {
			                   for(var i=0; i<sourcedata.length; i++) 
			                   {
			                       var zipstr = new JSZip(sourcedata[i], {base64:true});
			                       if(zipstr != undefined && zipstr.files[sorceval] != undefined) 
			                       {
			                           scomp = ''+zipstr.files[sorceval].data.trim();
			                           break;
			                       }
			                   }
			               }
			           }
			           if(targetdata != undefined)
			           {
			               if(targetdata.length > 0 )
			               { 
			                   for(var i=0; i<targetdata.length; i++) 
			                   {
			                       var zipstr = new JSZip(targetdata[i], {base64:true});
			                       if(zipstr != undefined && zipstr.files[targetval] != undefined) 
			                       {
			                           tcomp = ''+zipstr.files[targetval].data.trim();
			                           break;
			                       }
			                   }
			               }
			           }
			           
			           if(scomp == null || tcomp == null)
			           {
			               $(value).parent().parent().addClass('red');
			           }
			           else if(scomp != tcomp)
			           {
			               $(value).parent().parent().addClass('yellow');
			           }
			           else if(compareDiff)
			           {
			               $(value).parent().parent().addClass('hideItem');
			           }
			           else
			           {
			               $(value).parent().parent().removeClass('hideItem');
			           }
			       }
			       else
			       {
			           //if address of both files in zip is not same
			           $(value).parent().parent().addClass('yellow');
		           }
		       }
		       else
		       {
		       		$(value).parent().parent().addClass('red');      
		       }
		    });
	    }
	    else if(metadataType == 'CustomLabel')
		{
	    	// get file name for zip
	    	var labelsfile = s.length > 0 ? s[0] : null;
	    	var sourceval  = labelsfile != null ? $(labelsfile).val() : null;
	    	
			// source not has file name
			if(sourceval == '-')
			{
				labelsfile = t.length > 0 ? t[0] : null;
				sourceval  = labelsfile != null ? $(labelsfile).val() : null;
			}
			
	    	if(sourceval != null && sourceval != '-')
	    	{
	    		// get source file content andconvert to json
	    		var zipstr = sourcedata.length > 0 ? new JSZip(sourcedata[0], {base64:true}) : null;
	    		var srcxml = zipstr !=null && zipstr.files[sourceval] != undefined ? zipstr.files[sourceval].data.trim() : null;
	    		
	    		// get target file content and convert to json
	    		var zipstr_tgt = targetdata.length > 0 ? new JSZip(targetdata[0], {base64:true}) : null;
	    		var tgtxml = zipstr_tgt !=null && zipstr_tgt.files[sourceval] != undefined ? zipstr_tgt.files[sourceval].data.trim() : null;
	    		
	    		
	    		// map all files
	    		if(srcxml != null && tgtxml != null)
	    		{
		    		var srcjson = $.xml2json(srcxml);
		    		var tgtjson = $.xml2json(tgtxml);
		    	    
		    	    var tgtarr = [];
		    	    var tgtmap = {};
		    	    var labels = tgtjson.labels;
		    	    
		    	    var srcarr = [];
		    	    var srcmap = {};
		    	    var srclabels = srcjson.labels;
		    	    
		    	    $.each(labels, function( i, v )
		    	    {
		    	    	tgtarr.push(v.fullName);
		    	    	tgtmap[v.fullName] = v.value+v.shortDescription;
		    	    });
		    	    
		    	    $.each(srclabels, function( i, v )
		    	    {
		    	    	srcarr.push(v.fullName);
		    	    	srcmap[v.fullName] = v.value+v.shortDescription;
		    	    });
		    	    
		    	    // color source items
		    	    $.each(srcarr, function( i, v )
		    	    {
		    	    	if($('#'+v) != undefined)
		    	    	{
		    	    		if(tgtmap[v] == undefined)
		    	    		{
		    	    			$('#'+v).parent().parent().addClass('red');
		    	    		}
		    	    		else if(tgtmap[v] != srcmap[v])
		    	    		{
		    	    			$('#'+v).parent().parent().addClass('yellow');
		    	    		}
		    	    		else if(compareDiff)
				            {
				                $('#'+v).parent().parent().addClass('hideItem');
				            }
				            else
				            {
				                $('#'+v).parent().parent().removeClass('hideItem');
				            }
		    	    	}
		    	    	else
		    	    	{
		    	    		
		    	    	}
		    	    });
		    	    
		    	    // color target items which are not exist in source
		    	    $.each(tgtarr, function( i, v )
		    	    {
		    	    	if($('#'+v) != undefined)
		    	    	{
		    	    		if(srcmap[v] == undefined)
		    	    		{
		    	    			$('#'+v).parent().parent().addClass('red');
		    	    		}
		    	    		else if(tgtmap[v] != srcmap[v])
		    	    		{
		    	    			$('#'+v).parent().parent().addClass('yellow');
		    	    		}
		    	    		else if(compareDiff)
				            {
				                $('#'+v).parent().parent().addClass('hideItem');
				            }
				            else
				            {
				                $('#'+v).parent().parent().removeClass('hideItem');
				            }
		    	    	}
		    	    	else
		    	    	{
		    	    		
		    	    	}
		    	    });
	    		}
	    	}
		}
	    else if(mmap[metadataType])
		{
	    	 $.each(s, function( i, sv )
	    	 {
			     var sid = $(sv).attr("id");
			     var tes ="#target-"+sid;
			     var tid = $(tes).attr("id");
			   
	    		 var labelsfile = s.length > 0 ? sv : null;
	    	     var sourceval  = labelsfile != null ? $(labelsfile).val() : null;
	    	     var targetval = tid != undefined ? $(tes).val() : null;
	    	     if(sourceval != null && sourceval != '-' && targetval != null && targetval != '-')
	    	     {
		    		var zipstr = null;
		    		var srcxml = [];
		    		var tgtxml = [];
		    		for(var i=0; i<sourcedata.length; i++) 
		            {
		                   var zipstr = new JSZip(sourcedata[i], {base64:true});
		                   if(zipstr != undefined ? zipstr.files[sourceval] != undefined : false) 
		                   {
		                       srcxml.push(""+zipstr.files[sourceval].data);
		                   }
		            }
		    		for(var i=0; i<targetdata.length; i++) 
		            {
		                   var zipstr = new JSZip(targetdata[i], {base64:true});
		                   if(zipstr != undefined ? zipstr.files[targetval] != undefined :false) 
		                   {
		                       tgtxml.push(""+zipstr.files[targetval].data);
		                   }
		            }
		    		// map all files
		    		if(srcxml.length > 0 && tgtxml.length > 0)
		    		{
						var tgtmap = {};
						var srcmap = {};
		    			var sourceTargetWraper = getSourceTargetMap(metadataType,srcxml,tgtxml)
		    			tgtmap = sourceTargetWraper.source;
		    			srcmap = sourceTargetWraper.target;
		    			
			    	    var itemName = $(sv).attr("apiname");
			    	    var scomp = null;
			    	    var tcomp = null;
			    	    if(itemName!= undefined)
			    	    {
			    	    	var res = itemName.split(".");
			    	    	if(res.length > 0)
			    	    	{
			    	    		scomp = srcmap[res[res.length - 1]];
			    	    		tcomp = tgtmap[res[res.length - 1]];
			    	    		if(scomp == null || tcomp == null || scomp == undefined || tcomp == undefined)
					    	    {
					    	    	$(sv).parent().parent().addClass('red');
					    	    }
					    	    else if(scomp != tcomp)
					    	    {
					    	    	$(sv).parent().parent().addClass('yellow');
					    	    }
					    	    else if(compareDiff)
					            {
					                $(sv).parent().parent().addClass('hideItem');
					            }
					            else
					            {
					                $(sv).parent().parent().removeClass('hideItem');
					            }
			    	    	}
			    	    	else
			    	    		$(sv).parent().parent().addClass('red');
			    	    }  
			    	    else
			    	    	$(sv).parent().parent().addClass('red');
		    		}
		    		else
		    		{
		    			$(sv).parent().parent().addClass('red');
		    		}
	    	     }
	    	     else
	    	     {
	    	     	$(sv).parent().parent().addClass('red');
	    	     }
	    	 });
		}
	    hide();
}

function getSourceTargetMap(metaType,srcxml,tgtxml)
{
	var sourceTargetWraper = new Object();
	var tgtmap = {};
	var srcmap = {};
	for(var index in srcxml)
	{
		if(index < srcxml.length)
		{
			var srcjson = $.xml2json(srcxml[index]);
			if(srcjson != undefined)
			{
				var srcitems;
				if(metaType == 'CompactLayout')
				{
				    srcitems = srcjson.compactLayouts;
				}
				else if(metaType == 'CustomField')
				{
				    srcitems = srcjson.fields;
				}
				else if(metaType == 'WebLink')
				{
				    srcitems = srcjson.webLinks;
				}
				else if(metaType == 'RecordType')
				{
				    srcitems = srcjson.recordTypes;
				}
				else if(metaType == 'ListView')
				{
				    srcitems = srcjson.listViews;
				}
				else if(metaType == 'FieldSet')
				{
				    srcitems = srcjson.fieldSets;
				}
				else if(metaType == 'AssignmentRule')
				{
				    srcitems = srcjson.assignmentRule;
				}
				else if(metaType == 'AutoResponseRule')
				{
				    srcitems = srcjson.autoResponseRule;
				}
				else if(metaType == 'ValidationRule')
				{
				    srcitems = srcjson.validationRules;
				}
				else if(metaType == 'WorkflowTask')
				{
				    srcitems = srcjson.tasks;
				}
				else if(metaType == 'WorkflowOutboundMessage')
				{
				    srcitems = srcjson.outboundMessages;
				}
				else if(metaType == 'WorkflowFieldUpdate')
				{
				    srcitems = srcjson.fieldUpdates;
				}
				else if(metaType == 'WorkflowAlert')
				{
				    srcitems = srcjson.alerts;
				}
				else if(metaType == 'WorkflowRule')
				{
					srcitems = srcjson.rules;
				}
				if(srcitems != undefined)
				{
					if(srcitems.length != undefined && srcitems.fullName == undefined)
				    {
					    $.each(srcitems, function( i, v )
					    {
					    	srcmap[v.fullName] = JSON.stringify(v);
					    });
				    }
				    else
				    {
				    	srcmap[srcitems.fullName] = JSON.stringify(srcitems);   
				    }
				}
			}
		}
	}
	for(var index in tgtxml)
	{
		if(index < tgtxml.length)
		{
			var tgtjson = $.xml2json(tgtxml[index]);
			if(tgtjson != undefined)
			{
				var items;
				if(metaType == 'CompactLayout')
				{
					items = tgtjson.compactLayouts;
				}
				else if(metaType == 'CustomField')
				{
					items = tgtjson.fields;
				}
				else if(metaType == 'WebLink')
				{
					items = tgtjson.webLinks;
				}
				else if(metaType == 'RecordType')
				{
					items = tgtjson.recordTypes;
				}
				else if(metaType == 'ListView')
				{
					items = tgtjson.listViews;
				}
				else if(metaType == 'FieldSet')
				{
					items = tgtjson.fieldSets;
				}
				else if(metaType == 'AssignmentRule')
				{
					items = tgtjson.assignmentRule;
				}
				else if(metaType == 'AutoResponseRule')
				{
					items = tgtjson.autoResponseRule;
				}
				else if(metaType == 'ValidationRule')
				{
					items = tgtjson.validationRules;
				}
				else if(metaType == 'WorkflowTask')
				{
					items = tgtjson.tasks;
				}
				else if(metaType == 'WorkflowOutboundMessage')
				{
					items = tgtjson.outboundMessages;
				}
				else if(metaType == 'WorkflowFieldUpdate')
				{
					items = tgtjson.fieldUpdates;
				}
				else if(metaType == 'WorkflowAlert')
				{
					items = tgtjson.alerts;
				}
				else if(metaType == 'WorkflowRule')
				{
					items = tgtjson.rules;
				}
				if(items != undefined)
				{
					if(items.length != undefined && items.fullName == undefined)
				    {
				    	$.each(items, function( i, v )
					    {
					    	tgtmap[v.fullName] = JSON.stringify(v);
					    });  
				    }
				    else
				    {
					    tgtmap[items.fullName] = JSON.stringify(items);
				    }
				}
			}
		}
	}
    sourceTargetWraper.source = srcmap;
    sourceTargetWraper.target = tgtmap;
    
    return sourceTargetWraper;
}