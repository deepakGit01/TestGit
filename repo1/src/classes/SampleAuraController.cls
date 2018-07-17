public class SampleAuraController {
     
    //Get Contact List
    @AuraEnabled
    public static List<Contact> getContactList(Integer recordLimit, Integer recordOffset){
        Integer intLimit = Integer.valueof(recordLimit);
        Integer intOffset = Integer.valueof(recordOffset);
        List<Contact> conList = new List<Contact>();
        conList = [SELECT Id, Name, Email, Phone FROM Contact LIMIT :intLimit Offset :intOffset];
        return conList;
    }
     
    //Get Total Number of Contacts
    @AuraEnabled
    public static Integer getTotalContacts(){
        AggregateResult results = [SELECT Count(Id) TotalContacts  From Contact];
        Integer totalContacts = (Integer)results.get('TotalContacts') ; 
        return totalContacts;
    } 
     
    //Delete Contact
    @AuraEnabled
    public static void deleteContact(Contact con){
        Delete con;
    } 
}