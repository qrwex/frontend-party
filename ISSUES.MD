- ~~Background image could be .jpg instead of .svg this way you would avoid 5MB image being loaded for your user;~~
- Readme missing, except for the default create-react-app;
- ~~Login page does not handle redirection if user is already authenticated;~~
- ~~Password field has type of "text", instead of "password". This is a great security issue;~~
- Missing tests(unit, e2e or other);
- ~~Crashes on IE11, there are missing polyfills;~~
- ~~Directories where component is the only file could have been avoided and simple file named the same as directory would have worked perfectly;~~
- ~~"/servers" endpoint not working when navigating directly due to misconfigured Router;~~
- ~~Imports could be simpler/cleaner E.g.: "import Notifier from 'containers/Notifier'" if used "index" as file name, or "import { Notifier } from 'containers'" if using re-export "index" file in "containers" directory;~~
- ~~We've missed react built-in hooks usage. Only "useEffect" was used once, while it could have been used in router HOC as well(instead of lifecycle methods), and few other places in the app;~~
- ~~Class components were used where functional could have taken place.~~
- ~~No handling of "Unauthorized" requests for servers endpoint, it just keeps requesting to infinity. Imagine user with bad or expired token;~~
- ~~Current loading implementation is not a reliable/clean way to check if request is happening;~~
- Missing sorted servers implementation;
- Visual implementation is really far from provided design. It is okay to use libraries like material ui, but those should be supporting design, not overwriting it;
