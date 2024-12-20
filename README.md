Three Modules Are added 
Ingestion : Api is Added for triggering and to communicate with other microservice .The service may be in python or any language as the depeendency is only on the outcom from the service 
Document : Document can be uploaded 
User: User crud operations are added 
to create the user update the user 

The project include the user document system which can interact to other service currently we are ussing https method to interact with the another microservice but more better approach can be 
used like protobuf according to requirement as in this project the there is only request and response happens so http method seems ok .

Starting The project making every modules 
first I went through the user module added the user schema and than contoller and service module for user 
user service include creation of user and updation of user and accordingly the user dtos are being added 
than in contoller files the user contollers are added 

than moving on to the document section than the uploading of the document and contoller and services are being added 

than the ingestion module is being added to interact with the any python api or may be any other service so that the service response and accordingly the response we take the action needed 
 after that i added the ENV file to manage the environment 

 After all the jest module is being used to manage the test cases for the project to test different test cases 
 like jwt 
 user validations and 
