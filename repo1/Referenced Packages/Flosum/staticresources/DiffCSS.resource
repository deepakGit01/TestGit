table.diff {
    border-collapse:collapse;
    border:1px solid darkgray;
    white-space:pre-wrap;
    word-wrap :break-word;
    width :100% !important;
    table-layout: fixed ;
}

table.diff tbody { 
    font-family:Courier, monospace
        width:500px;
}

table.diff tbody th {
    font-family:verdana,arial,'Bitstream Vera Sans',helvetica,sans-serif;
    background:#EED;
    font-size:11px;
    font-weight:normal;
    border:1px solid #BBC;
    color:#886;
    padding:.3em .5em .1em 2em;
    text-align:right;
    vertical-align:top;
    width: 45px !important;
}

table.diff thead {
    border-bottom:1px solid #BBC;
    background:#EFEFEF;
    font-family:Verdana
}

table.diff thead th {
    text-align:left;
}

table.diff thead th.texttitle {
    text-align:left;
    height: 35px;
    vertical-align: middle;
    width: inherit;
}

table.diff thead th.emptytitle {
    text-align:left;
    height: 35px;
    width: 51px !important;
}

table.diff thead th{
    width : 4%;
    
}

table.diff tbody td {
    padding:.4em .4em;
    padding-top:.4em;
    vertical-align:top;
    font-family: monospace;
    width:500px;
}
table.diff tbody tr {
    border:solid 1px #ccc;
    width:500px;
}

table.diff .empty {
    background-color:#FAF8F8;
}

table.diff .replace {
    background-color:#FFF96C;
	width: 50% !important;
}
table.diff .delete {
    background-color:#FF6161;
}

table.diff .skip {
    background-color:#EFEFEF;
    border:1px solid #AAA;
    border-right:1px solid #BBC;
}

table.diff .insert {
    background-color:#B6FFB6
}

table.diff .equal {
    background-color:#FFFFFF;
	width: 50% !important;
}

table.diff th.author {
    text-align:right;
    border-top:1px solid #BBC;
    background:#EFEFEF
}

body{
    font-size: 12px;
}

textarea{
    width:500px;
    row:15;
}

table.diff {
    width:1024px;
}