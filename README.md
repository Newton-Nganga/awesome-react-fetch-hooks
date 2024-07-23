# Reactjs Custom Fetch Hooks

<div height="200px" width="200px" align="center">  
    <img src="https://github.com/user-attachments/assets/32b8e0a2-e0a4-4bbd-8525-03dc1c289312"/> 
    ![custom-hooks](https://github.com/user-attachments/assets/32b8e0a2-e0a4-4bbd-8525-03dc1c289312)  
</div>

### Usage and Installation
change directory to your `src/ `  and execute the following comand: 

```bash  
git clone https://github.com/Newton-Nganga/awesome-react-fetch-hooks.git hooks/
```

Lastly execute this command to clean up the directory: 

```bash
cd hooks/ ; sudo rm -r .git/
```

And viola! you can now import the hooks where you need them.

### Preliquisites
- Be using Reactjs or Vite


#### Example of useDataFetch hook looks like

```js 

    /* eslint-disable react-hooks/exhaustive-deps */
    /* eslint-disable react-hooks/rules-of-hooks */

    import { useEffect, useState } from "react";

    export default function useDataFetch(url, options) {
    const opt = options ? options : {};
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);

        try {
        const response = await fetch(url, {
            ...opt,
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...opt?.headers,
            },
        });
        const data = await response.json();
        setResponseData(data);
        } catch (error) {
        setError(error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, options]);

    const refetch = () => {
        fetchData();
    };

    return { responseData, error, isLoading, refetch };
    }
``` 
### Get Started
After initializing the hook into your app
#### Importing the Hook 

```js   
    import useDataFetch from "hooks/useDataFetch";
```

#### Setting up the URL and Options
Define the URL for the API endpoint and any necessary options for the fetch request.

```js   

    const url = "http://localhost:8080/api/data";

    const options = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer wsvhvccmnm"
    }
    };

```   

### Order of Handling the Returned items
- Handle Loading State First
- Handle Errors
- Display or Use Data   

### Handling Loading State
Check if the loading state is active and display a loading indicator.

```js

    if (isLoading) {
    //do sth incase resource is still loading..
    return <div>Loading...</div>;
    }
```
### Handling Errors
Check if an error occurred and handle it accordingly.  

```js  
    //do sth incase an error is caught ...
    if (error) {
    return <div>Error: {error.message}</div>;
    }
```


#### Displaying Data
If loading is complete and no errors occurred, display the fetched data.  

```js
    //do sth when the action is complete
    return (
    <>
        {responseData && responseData.map((item) => (
        <div key={item.id}>{item.name}</div>
        ))}
    </>
    );
```


### sample complete usage of the hooks

```js
    import React from "react";
    import useUpdateData from "hooks/useUpdateData";

    const DataUpdatingComponent = () => {

    const userId="1003"
    const url = `http://localhost:8080/api/data/${userId}`;
    
    //options could be empty but url can't be null/empty
    const options = {
        headers: {
        //   "Content-Type": "application/json", --by default this is the set
        "Authorization": "Bearer wsvhvccmnm"
        }
        //...more otions
    };

    const { responseData, error, isLoading, updateData } = useUpdateData(url, options);
    //your handle update function
    const handleUpdate = () => {
        const updatedData = {
        // the data/ fields you want to update
        name:"John"
        email: "john@email.js"
        };
        //call the upData method from the hook and pass in the updated data object
        updateData(updatedData);
    };
    //handle loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    //handle an error if its caught
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    //do sth with the responseData returned
    if(responseData.status.ok){
        toast.success("item updated successfully")
    }
    return (
        <>
        //the rest of the app
        <button onClick={handleUpdate}>Update Data</button>
        // the rest of the app
        </>
    );
    };

    export default DataUpdatingComponent;
```



#### Created By

created by  [Newton]("https://github.com/Newton-Nganga/") for reusability.
