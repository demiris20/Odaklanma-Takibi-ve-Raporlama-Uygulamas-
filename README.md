Odaklanma Takip ve Raporlama Uygulaması
------------------------------------------------------------

Bu proje, React Native ve Expo kullanılarak geliştirilmiş basit ama işlevsel bir odaklanma takip uygulamasıdır.
Uygulamanın amacı; çalışma sürecini daha düzenli hâle getirmek, dikkat dağınıklıklarını kaydetmek ve kullanıcıya 
günlük/haftalık performansı hakkında anlamlı geri bildirimler sunmaktır.

Uygulamanın Amacı
--------------------

Çalışma süresini disipline etmek

Dikkat dağınıklıklarını takip edebilmek

Günlük/haftalık çalışma seviyesini görebilmek

Çalışmayı kategorilere ayırarak daha düzenli bir yapı oluşturmak

Bu uygulama aynı zamanda AppState kullanımı, seans kaydı, grafik gösterimi ve çoklu ekran yapısını da içermektedir.

Özellikler
-----------

Zamanlayıcı : 
10, 15, 25, 45 veya 60 dakika olarak ayarlanabilir.
Başlat, duraklat ve sıfırla seçenekleri bulunur.
Süre tamamlandığında çalışma seansı otomatik kaydedilir.

Kategori Seçimi:
-----------------

Kullanıcı şu kategorilerden birini seçerek çalışmaya başlar;
Ders, Kodlama, Proje,Kitap.
Kategori seçmeden zamanlayıcı başlamaz.

Dikkat Dağınıklığı Takibi
---------------------------

Uygulama arka plana geçtiğinde ;
Sayaç durdurulur, dikkat dağınıklığı değeri +1 artırılırm ,
uygulamaya geri dönünce kullanıcıya "devam etmek ister misiniz?" uyarısı gösterilir

Raporlama Ekranı
-----------------

Bugünün toplam çalışma süresi
Toplam dikkat dağınıklığı
Tüm zamanların çalışma süresi
Son 7 günün çubuk grafiği
Kategori dağılımının pasta grafiği
Kaydedilmiş tüm seansların listesi

Dark Mode
----------
Kullanıcı tek tuşla karanlık/açık mod arasında geçiş yapabilir.


Kullanılan Teknolojiler
------------------------

React Native (Expo)
React Navigation (Bottom Tabs)
AppState API
react-native-chart-kit
JavaScript



QR kodu Expo Go uygulamasıyla tarayarak uygulamayı çalıştırabilirsiniz.




Dosya Yapısı (Kısa Özeti)
--------------------------

screens/
 ├── HomeScreen.js
 └── ReportsScreen.js
App.js
package.json

Notlar
--------

Kod yapısını sade, anlaşılır ve modüler tutmaya özen gösterdim.

Uygulama hem mobil cihazda hem de web ortamında test edilmiştir.

Geliştirici
----------

İsmail Demir
Sakarya Üniversitesi – Bilgisayar Mühendisliği
