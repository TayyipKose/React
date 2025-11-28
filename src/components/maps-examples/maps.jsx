function MapsExample() {
    const users = [
        { id: 1, name: "Ahmet", score: 90 },
        { id: 2, name: "Mehmet", score: 60 },
        { id: 3, name: "Ayşe", score: 45 },
    ];

    const isLoading = false;
    const showList = true;

    const LoadingTemplate = () => <div>Yükleniyor...</div>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Kullanıcı Listesi</h2>

            {isLoading && <LoadingTemplate />}

            {!isLoading && showList && (
                <ul>
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className={user.score >= 70 ? "success" : "danger"}
                            style={{
                                marginBottom: "8px",
                                fontWeight: "bold",
                                color: user.score >= 70 ? "green" : "red",
                            }}
                        >
                            {user.name} – {user.score} puan
                        </li>
                    ))}
                </ul>
            )}

            {!showList && <div>Liste gösterilmiyor...</div>}
        </div>
    );
}

export default MapsExample;

/**
 * 📌 ÖĞRENME NOTLARI (KRİTİK NOKTALAR)
 * ----------------------------------------------------
 * 1) React'te *ngFor yok, onun yerine map() kullanılır.
 *    Örnek:
 *      users.map(user => (...))
 *
 * 2) Angular'daki *ngIf yerine React'te:
 *      - Koşul && JSX
 *      - Ternary operator
 *    Kullanılır.
 *    Örnek:
 *      showList && <div>...</div>
 *
 * 3) Angular ngClass yerine React'te className + koşul yazarsın.
 *    Örnek:
 *      className={score > 70 ? "success" : "danger"}
 *
 * 4) Angular ng-template → React'te küçük bir component olarak yazılır.
 *    Örnek:
 *      const LoadingTemplate = () => <div>Yükleniyor...</div>;
 *
 * 5) React'te return içinde her şey JavaScript ifadesidir.
 *    {} görürsen JS'ye geçilmiş demektir.
 *
 * 6) map() zorunlu olarak bir "key" ister.
 *    Bu key, listedeki her elemanı takip etmesi için kullanılır.
 *    En iyi key benzersiz id'dir.
 *
 * 7) JSX, HTML gibi görünür ama aslında JavaScript'tir.
 *    Bu yüzden {} içine her şey yazılabilir: koşul, fonksiyon, değişken, hesaplama…
 *
 * 8) React'te style prop obje şeklindedir (HTML’den farklıdır).
 *    camelCase kullanılır:
 *      style={{ marginBottom: "8px" }}
 */
