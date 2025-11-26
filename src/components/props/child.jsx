function Child({currentNumber, onIncrement}) {
    const handleButtonClick = () => {
        const messageToSend = `Child'dan haber: Sayı arttırıldı! (Zaman: ${new Date().toLocaleTimeString()})`;
        onIncrement(messageToSend);
    };

    return (
        <div style={{padding: 15, border: "1px solid blue", margin: 10, backgroundColor: "#f0f8ff"}}>
            <h3>Sayaç Kartı (Child)</h3>

            <p>Gelen sayı (Parent'tan): {currentNumber}</p>

            <button onClick={handleButtonClick} style={{padding: 10, backgroundColor: "lightgreen"}}>
                Sayaçı Artır! (+1, Mesaj Gönder)
            </button>

            <p><small>Not: Child mesajı Parent'a yolluyor, Parent listeliyor.</small></p>
        </div>
    );
}

export default Child;


/**
 * CHILD MANTIĞI — KISA ÖZET
 * ==========================
 *
 * 1) Parent → Child (Veri Aşağı Akar)
 *    - Child, Parent’tan gelen currentNumber'ı sadece gösterir.
 *    - Child bu değeri değiştiremez (tek yönlü okuma).
 *
 * 2) Child → Parent (Callback Yukarı Akar)
 *    - Child butona basınca Parent’ın verdiği onIncrement callback’ini çağırır.
 *    - Callback çağrılırken istenirse veri de taşınır: onIncrement("butona basıldı").
 *    - Yani: Child kendi içinden Parent’ın fonksiyonunu tetikleyerek Parent’ı “haberdar eder”.
 *
 * 3) Temel Akış (Adım Adım)
 *    - Parent state oluşturur (örn: number).
 *    - Bu state’i Child’a normal prop olarak yollar.
 *    - Child bu değeri ekranda gösterir.
 *    - Kullanıcı Child’daki butona basar.
 *    - Child → Parent: onIncrement() tetiklenir.
 *    - Parent bu çağrıyı yakalar, state’i günceller.
 *    - State değişince Parent yeniden render olur → Child’a güncel veri iner.
 *
 * 4) Mantık
 *    - Child = Göster + Tetikle (yukarı haber ver)
 *    - Parent = Tut + Yönet + Güncelle
 *
 * 5) !!! Parent-Child Örneğinin Açıklaması
 *
 * - Parent sayıyı yönetiyor (state sadece Parent’ta).
 * - Child bu sayıyı sadece göstermek için prop olarak alıyor.
 * - Child sayıyı değiştiremez; sadece ekranda görüntüler.
 *
 * Child’ın görevi:
 * - Butona basıldığında Parent’ın verdiği callback'i çağırmak.
 * - Yani: "Bir olay oldu, işlemi sen yap" diye Parent'ı tetiklemek.
 *
 * Parent’ın görevi:
 * - Child’dan gelen callback çağrısını yakalamak.
 * - Sayıyı +1 arttırmak.
 * - Mesaj listesine Child’dan gelen bilgiyi eklemek.
 * - State güncellenince yeniden render olmak.
 * - Güncel sayıyı tekrar Child’a prop olarak göndermek.
 *
 * Kısacası:
 * - Child = Sadece olay tetikler.
 * - Parent = Veriyi yönetir ve günceller.
 */
