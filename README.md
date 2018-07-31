## Implementation:

- Storage Supports Basic CRUD
``` javascript
import { Storage } from 'aws-amplify';

Storage.get(pathName);
Storage.put(pathName);
Storage.remove(pathName);
Storage.list(pathName);
```
- 3 leves of privacy 
```javascript
Storage.get(`fileName`, {level: 'public'});
Storage.get(`fileName`, {level: 'protected'});
Storage.get(`fileName`, {level: 'private'});
Storage.vault.get(`fileName`) // defaults to private

// Each of these return a promise
```
- Create URLs with expiration
```javascript
Storage.get(`fileName`, { expires: 60 })
    .then(console.log)
    .catch(console.error);
```
- `awsmobile init -y && awsmobile user-files enable`
- `awsmobile  analytics disable`
- `npm start // to run the app`
- inform react-frontend of aws-backend via
```javascript
import Amplify from 'aws-amplify';
import configuration from 'aws-exports';

Amplify.configure(configuration);
```
- `awsmobile push` to update server code
- `Storage.list('')` - empty string gets you all the content of the bucket
- workflow: get the keys from AWS then use these keys to get the actual URL of the image from Storage API
- `<S3Image>` component requests the URL for key prop (note: not the react key prop)
- enable auth: `awsmobile user-signin enable --prompt && awsmobile push`
- Add authentication on the frontend via - 
```javascript
import { withAuthencticator } from 'aws-amplify-react';
...
export default withAuthenticator(Application);
```
- finally set the privacy level of Storage `Storage.configure({ level: 'privacy' });` - give images unique to each user
- note: to have common auth across multiple apps share the backend auth code across these applications

