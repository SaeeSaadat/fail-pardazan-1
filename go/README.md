# go backend

runs on port 8080.

handles 2 requests as requested!

- **/sha**: a POST request that receives in json A and B (either number or string) and returns A+B in sha256 format
- **/write**: a GET request that receives the query param 'line' and returns the line's line from the file.txt in the main folder of the project inside the response body in text format.

each request handles possible errors and returns appropriate error codes and messages.
other requests will face 404 error!
