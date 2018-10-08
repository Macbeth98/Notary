# Notary
The app will find/verify the owner of a file(Who first uploaded/posses the file)
Since saving large amounts data in ethereum costs money I have taken hash of the file and stored it on the ethereum blockchain.
Whenever a person tries to upload a document/file, it will convert the file into the sha256 digest value and check whether the hash exists in the blockchain through some methods defined in contract
If it does not a new entry of file will be created and if it does the contract will not store the hash.
The app can also find the owner and original filename.
