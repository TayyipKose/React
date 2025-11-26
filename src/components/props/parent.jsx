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
 * /**
 *  * PARENT MANTIĞI – KISA ÖZET
 *  *
 *  * Parent = Veri yöneticisi, Child = Görüntüleyici + Tetikleyici
 *  *
 *  * 1. useState:
 *  *    - React’in özel “state kutusu”. Değişince ekranı otomatik günceller.
 *  *    - let counter = 0 kullanamayız, çünkü değişiklik görünmez.
 *  *    - const [counter, setCounter] = useState(başlangıç);
 *  *
 * * 2. setCounter / setMessages:
 * *    - State güncelleyici fonksiyonlar.
 * *      - setCounter → counter’ı günceller.
 * *      - setMessages → messages array’ini günceller.
 * *    - State değişince Component yeniden render olur → ekranda güncel değerler görünür.
 * *      Yani: setMessages ile array’i değiştirdiğinde, map ile ekranda son hâlini gösterebilirsin.
 * *    - Başlangıç değeri vermezsek undefined olur → hata çıkar.
 *  *
 *  * 3. messages.map():
 *  *    - State array’i (messages) JSX’te liste hâline çevirir: {messages.map((msg,i)=><li key={i}>{msg}</li>)}
 *  *    - key={index} performans için gerekli.
 *  *    - Akış: Child tetikler → Parent handleIncrementFromChild çalışır → setMessages ile liste güncellenir → map ile ekranda görünür.
 *  *
 *  * 4. currentNumber vs counter:
 *  *    - counter: Parent state’i (ana veri).
 *  *    - currentNumber: Child’a prop olarak gönderilen kopya.
 *  *    - Veri akışı: Parent → Child (gösterim), Child → Parent (callback ile haber verme).
 *  *
 *  * 5. onIncrement / handleIncrementFromChild:
 *  *    - onIncrement = Child’a gönderilen fonksiyon (Parent’tan)
 *  *    - handleIncrementFromChild = Parent fonksiyonu, Child butona basınca tetiklenir.
 *  *    - Akış: Child tetikler → handleIncrementFromChild çalışır → setCounter + setMessages → state güncellenir → re-render.
 *  *
 *  * 6. Genel Akış:
 *  *    - Parent state tutar → Child’a yollar.
 *  *    - Child gösterir → Butona basılınca onIncrement() tetiklenir.
 *  *    - Parent state günceller → Re-render → Child’a güncel veri gider + mesaj listesi ekranda map ile görünür.
 *  *
 *  * 7. Özet:
 *  *    - Child = Sadece olay tetikler.
 *  *    - Parent = Veriyi yönetir ve günceller, re-render ile ekrana yansır.
 *
 *  */

