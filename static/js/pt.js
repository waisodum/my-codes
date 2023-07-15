 function populateTable() {
   fetch('/data')
     .then((response) => response.json())
     .then((data) => {
console.log('data');
     })
     
     .catch((error) => {
       console.error('Error fetching data from the server', error);
     });
 }
 
 // Populate the table when the page loads
 populateTable();
 