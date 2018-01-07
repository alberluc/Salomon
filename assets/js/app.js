import { App as AppModel } from './components/App'

let App = new AppModel();

if(document.readyState !== 'loading'){
    App.init();
}
else{
    document.addEventListener('DOMContentLoaded', App.init.bind(App));
}
