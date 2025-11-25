import './App.css';
import UserInfo from "./components/user-info/user-info";
import Child from "./components/props/child";

function App() {
    const _message = 'Hello World';
    return (
        <div className="App">
            <Child></Child>
        </div>
    );
}

export default App;


/**
 * 1- function App() {...}
 *    - React component’i. Angular’daki component class veya template gibi düşünebilirsin.
 *    - JSX kullanıyoruz: HTML benzeri ama JS içinde yazılan syntax.
 *
 * 2- return (...)
 *    - JSX ile render edilecek UI’yi belirliyoruz.
 *    - Angular template’deki HTML ile aynı mantık.
 *
 * 3- export default App;
 *    - Bu component’i dışarıya açıyoruz.
 *    - Angular’daki `export class AppComponent` veya module export gibi.
 *    - Başka dosyalarda import edip kullanabiliriz:
 *      import App from './App';
 */
