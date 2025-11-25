function Child({normalText, numberFromParent, onIncrement}) {

    const handleIncrement = () => {
        console.log("Child: Butona basıldı, Parent bilgilendiriliyor!");
        onIncrement(); // Callback prop → Parent'ı tetikliyoruz
    };

    return (
        <div style={{marginTop: 20, padding: 20, border: "1px solid blue"}}>
            <h3>Child Component</h3>

            {/* Normal prop (Parent → Child veri akışı) */}
            <p>Normal prop from Parent: {normalText}</p>
            {console.log("Child: Normal prop değeri:", normalText)}

            {/* Parent’tan gelen sayı */}
            <p>Number from Parent: {numberFromParent}</p>

            {/* Callback prop (Child → Parent veri akışı) */}
            <button onClick={handleIncrement}>Increase Number in Parent</button>
        </div>
    );
}

export default Child;

/**
 * CHILD COMPONENT AÇIKLAMASI
 * -----------------------------------------
 * 1) normalText:
 *    - Parent'tan gelen NORMAL VERİ (props)
 *    - Child bunu sadece gösterir ve console.log ile görebilirsin
 *
 * 2) numberFromParent:
 *    - Parent'ın state'ini gösterir, Child sadece gösterir
 *
 * 3) onIncrement:
 *    - CALLBACK PROP
 *    - Parent tarafından Child'a gönderilen fonksiyon
 *    - Child bu fonksiyonu çağırır → Parent haberdar olur → state değişir
 *
 * 4) Özet Akış:
 *    Parent → Child : normalText, numberFromParent (normal prop)
 *    Child → Parent : onIncrement() çağrısı (callback prop)
 *    Child kendi state’i yok ama Parent’ı bilgilendiriyor
 *    Parent state güncellenince ekranda sayı artıyor
 */
