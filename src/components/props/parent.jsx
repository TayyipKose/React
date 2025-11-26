import {useState} from "react";
import Child from "./child";

function Parent() {
    const [counter, setCounter] = useState(0);
    const [messages, setMessages] = useState([]);

    const handleIncrementFromChild = (messageFromChild) => {
        setMessages(prevMessages => [...prevMessages, messageFromChild]);
        setCounter(prevCounter => prevCounter + 1);
    };

    return (
        <div style={{padding: 20, border: "2px solid green", margin: 10}}>
            <h2>Sayaç Ana Sayfası (Parent)</h2>
            <p>Ana sayı (state'ten): {counter}</p>

            <h4>Gelen Mesajlar (Child → Parent):</h4>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>

            <Child
                currentNumber={counter}
                onIncrement={handleIncrementFromChild}
            />
        </div>
    );
}

export default Parent;

/**
 * PARENT MANTIĞI – KISA ÖZET
 *
 * Parent = Veri yöneticisi, Child = Görüntüleyici + Tetikleyici
 *
 * 1. useState:
 *    - React’in özel “state kutusu”. Değişince ekranı otomatik günceller.
 *    - let counter = 0 kullanamayız, çünkü değişiklik görünmez.
 *    - const [counter, setCounter] = useState(başlangıç);
 *
 * 2. setCounter / setMessages:
 *    - State güncelleyici fonksiyonlar, re-render tetikler.
 *    - Başlangıç değeri vermezsek undefined olur → hata çıkar.
 *
 * 3. messages.map():
 *    - Array’i JSX’te liste hâline çevirir: {messages.map((msg,i)=><li key={i}>{msg}</li>)}
 *    - key={index} performans için gereklidir.
 *
 * 4. currentNumber vs counter:
 *    - counter: Parent state’i.
 *    - currentNumber: Child’a prop olarak gönderilen kopya.
 *    - Akış: Parent → Child (veri aşağı akar), Child → Parent (callback ile haber verir)
 *
 * 5. onIncrement / handleIncrementFromChild:
 *    - onIncrement = Child’a gönderilen fonksiyon (Parent’tan)
 *    - handleIncrementFromChild = Parent fonksiyonu, Child çağırınca tetiklenir
 *
 * 6. Akış:
 *    - Parent state tutar → Child’a yollar
 *    - Child gösterir → Butona basılınca onIncrement() tetiklenir
 *    - Parent state günceller → Re-render → Child’a güncel veri gider
 */

