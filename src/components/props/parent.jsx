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
 * PARENT MANTIĞI:
 * Düşün: Parent bir "ana sayfa" gibi. Tüm veriyi (state) tutar, Child'a yollar. Child haber verince günceller.
 * Senin Soru: "Parent'a nasıl data yolluyoruz?" → Child callback çağırır (onIncrement(mesaj)), Parent onu handleIncrementFromChild'ta alır.
 * Tüm Parent: Veri tut (state) → Child'a yol (prop) → Child tetikle → Veri güncelle (set) → Re-render (ekran yenilenir).
 *
 * 1. useState NEDİR? NİYE DIREKT DEĞİŞKEN TANIMLAMIYORUZ? (Temel Kavram)
 *    - useState: React'in "özel kutusu". Değişken gibi ama React'i haberdar eder: "Bu değişti, ekranı yenile!"
 *    - Neden direkt let counter = 0 demiyoruz? Çünkü React'te değişim "görünmez" olur. Sayfa yenilenmez, kullanıcı görmez.
 *      - Örnek: let counter = 0; counter++; → Ekranda değişmez (React bilmez). useState ile: setCounter(1) → Otomatik re-render.
 *    - Nasıl? const [değer, setDeğer] = useState(başlangıç); → İki şey döner: Değer oku (counter), Değiştir (setCounter).
 *    - Gerçek Hayat: useState = "Veritabanı bağlantısı". Değişim kaydedilir, ekran güncellenir.
 *
 * 2. setMessages VE setCounter NE? useState İÇİNDE 0 VE BOŞ ARRAY VERMEM SEBEBİ NE?
 *    - setMessages/setCounter: "Güncelleyici" fonksiyonlar. State'i değiştirir, React re-render yapar.
 *      - Örnek: setCounter(prev => prev + 1); → Eski değeri al (+1), yeni state'e koy → Ekran yenilenir.
 *    - Başlangıç değeri (useState(0) veya useState([])): Component ilk yüklendiğinde ne olsun?
 *      - 0: Sayaç sıfır başlasın (mantıklı başlangıç).
 *      - [] (boş array): Mesaj listesi boş başlasın (hiç mesaj yok).
 *      - Neden? Yoksa undefined olur, hata verir (örn: {undefined} ekranda boşluk).
 *    - Kural: Her zaman başlangıç ver (primitive: sayı/string, array/obj: boş hali).
 *
 * 3. <ul> {messages.map(...)} </ul> BURDA NE YAPIYORUZ? DEĞİŞKENİ NASIL DİREKT .map DÖNEBİLİYORUZ?
 *    - Ne yapıyoruz? Array'i (messages) JSX'te liste yapıyoruz: Her elemanı <li>ye çevir.
 *    - Nasıl .map? JavaScript özelliği: Array.map() her öğeyi dönüştürür, yeni array döner.
 *      - Örnek: messages = ["Msg1", "Msg2"]; map((msg, index) => <li>{msg}</li>) → [<li>Msg1</li>, <li>Msg2</li>]
 *      - JSX'te { } içinde JS kodu çalışır: {array.map(...)} → Otomatik döngü, liste oluşturur.
 *    - key={index}: React'e "Bu liste öğesi benzersiz" der (hızlı render için). Index yeterli (basit liste).
 *    - Gerçek Hayat: Alışveriş sepeti: {items.map(item => <div>{item.name}</div>)} – Her ürünü göster.
 *    - Soru Cevap: Değişken direkt .maplenir çünkü array! (String/number olamaz, hata verir.)
 *
 * 4. currentNumber NEDİR? DEĞER ALDIĞI counter NEDİR? HANGİSİ CHİLD'DAN GELİYOR/GİDİYOR?
 *    - counter: Parent'ın state'i (kendi verisi, örn: 5). Parent içinde kullanılır (<p>{counter}</p>).
 *    - currentNumber: Prop adı (Child'a gönderilen kopya). Değeri counter'dan alır.
 *    - Akış: Parent → Child gidiyor (veri: counter değeri currentNumber olarak Child'a).
 *      - Child'dan gelmiyor! Child sadece gösterir, geri yollar (callback'le).
 *    - Özet: counter = Parent'ın orijinali (yönetir). currentNumber = Child'ın kopyası (gösterir).
 *
 * 5. onIncrement VE handleIncrementFromChild HANGİSİ PARENT'İN/HANGİSİ CHİLD'IN? DATA GELİYOR MU GİDİYOR MU?
 *    - handleIncrementFromChild: Parent'ın fonksiyonu (kendi callback'i). Child çağırınca çalışır.
 *    - onIncrement: Prop adı (Parent Child'a yollar). Değeri handleIncrementFromChild'tır.
 *    - Akış Yönü:
 *      - Parent → Child gidiyor: onIncrement = handleIncrementFromChild (fonksiyonu yollar).
 *      - Child → Parent geliyor: Child onIncrement(mesaj) çağırır → handleIncrementFromChild tetiklenir, mesajı alır.
 *    - Giden (Parent → Child): Fonksiyon (tetikleme için) + veri (currentNumber).
 *    - Gelen (Child → Parent): Mesaj parametresi (callback çağrısında) + tetikleme.
 *    - Özet: onIncrement = "Yolda giden fonksiyon" (Parent'ten Child'a). handleIncrementFromChild = "Eve dönen fonksiyon" (Child tetikleyince Parent çalışır).
 *
 * 6. GENEL AKŞ (Tüm Parent Özeti: Kafan Otursun)
 *    - Başlangıç: State'ler yükle (0, []).
 *    - Render: State göster (<p>{counter}</p>), liste döngü (.map), Child'a prop yol (currentNumber + onIncrement).
 *    - Tetikleme: Child buton → onIncrement(mesaj) → handle... çalışır → setMessages/setCounter → Re-render (liste/sayı güncellenir).
 *    - Neden Parent? Veri tek yerde (state), Child sadece arayüz. Büyük app'lerde kaos önler.
 *
 * 7. TEST VE PRATİK (Anla Diye Dene)
 *    - Başlangıç: counter=0, messages=[] – Liste boş.
 *    - Buton bas: Child mesaj yollar → Parent alır, ekler (+1) → Liste: ["Msg1"], counter=1.
 *    - Değiştir: useState(10) yap, başlangıç 10 olsun – Child hemen görsün.
 *    - Hata Dene: setCounter'ı sil, değişim olmaz – useState'in gücünü gör.
 */
