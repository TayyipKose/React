import {useState} from "react";
import Child from "./Child";

function Parent() {
    const [number, setNumber] = useState(0);

    // Child butona basınca çalışacak
    const handleChildIncrement = () => {
        console.log("Parent: Child tarafından tetiklendim!");
        setNumber(prev => prev + 1);
    };

    return (
        <div style={{padding: 20, border: "1px solid black"}}>
            <h2>Parent Component</h2>
            <p>Current number: {number}</p>

            <Child
                normalText="Hello from Parent!"      // 🔹 Normal prop
                numberFromParent={number}           // 🔹 Normal prop
                onIncrement={handleChildIncrement}  // 🔹 Callback prop
            />
        </div>
    );
}

export default Parent;

/**
 * PARENT COMPONENT AÇIKLAMASI
 * ----------------------------------
 * 1) normalText, numberFromParent:
 *    - Normal props (Parent → Child veri akışı)
 *    - Child ekranda gösterir, console.log ile görebilirsin
 *
 * 2) onIncrement:
 *    - Callback prop (Child → Parent veri akışı)
 *    - Child bu fonksiyonu çağırınca Parent state’i değişir
 *
 * 3) Akış Özet:
 *    1. Parent → Child : normalText, numberFromParent (veri)
 *    2. Child → Parent : onIncrement() çağrısı → Parent state değişir
 *    3. Parent yeniden render olur → number artar
 *
 * 4) Önemli:
 *    - Child kendi state’ini değiştiremez
 *    - Parent state’i yönetir, Child bildirim gönderir
 *    - Bu yapı Angular’daki @Input / @Output EventEmitter mantığına çok benzer
 */
