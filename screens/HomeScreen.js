import React, { useState, useEffect } from "react";
import { View, Text, AppState, Alert } from "react-native";

export default function HomeScreen({ sessions, setSessions }) {

  // -------------------- STATE --------------------
  const [customMinutes, setCustomMinutes] = useState(25);
  const [time, setTime] = useState(25 * 60);

  const [isRunning, setIsRunning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [distractions, setDistractions] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const [darkMode, setDarkMode] = useState(false);
  const [testMode, setTestMode] = useState(false);

  const categories = ["Ders", "Kodlama", "Proje", "Kitap"];


  // -------------------- TIMER --------------------
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          const step = testMode ? 12 : 1;      // Test modu hızlı azaltsın
          const limit = testMode ? 12 : 1;     // Sona yaklaşınca durma limiti

          if (prev <= limit) {

            // Seans kaydı
            setSessions((old) => [
              ...old,
              {
                category: selectedCategory,
                duration: customMinutes * 60 - time,
                distractions: distractions,
                date: new Date().toISOString().split("T")[0],
              }
            ]);

            setIsRunning(false);
            return 0;
          }

          return prev - step;
        });
      }, testMode ? 200 : 1000);   // Test modu için çok hızlı interval
    }

    return () => clearInterval(interval);
  }, [isRunning, testMode]);


  // -------------------- APP STATE (arka plana geçiş) --------------------
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {

      // Arka plana geçerse
      if (nextState === "background" && isRunning) {
        setIsRunning(false);
        setDistractions((prev) => prev + 1);
      }

      // Geri döndüğünde
      if (nextState === "active") {
        if (!isRunning && startTime !== null && time !== customMinutes * 60) {

          Alert.alert(
            "Zamanlayıcı duraklatıldı",
            "Devam etmek ister misiniz?",
            [
              {
                text: "Hayır",
                onPress: () => {
                  setSessions((old) => [
                    ...old,
                    {
                      category: selectedCategory,
                      duration: Math.floor((Date.now() - startTime) / 1000),
                      distractions: distractions,
                      date: new Date().toISOString().split("T")[0],
                    }
                  ]);

                  setTime(customMinutes * 60);
                  setSelectedCategory(null);
                  setDistractions(0);
                  setStartTime(null);
                },
                style: "cancel",
              },
              {
                text: "Evet",
                onPress: () => setIsRunning(true),
              },
            ]
          );
        }
      }
    });

    return () => subscription.remove();
  }, [isRunning, startTime, time]);


  // -------------------------------------------------------------
  // --------------------   RETURN UI   --------------------------
  // -------------------------------------------------------------
  return (
    <View 
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkMode ? "#000" : "#fff",
      }}
    >

      {/* -------- DARK MODE -------- */}
      <Text
        onPress={() => setDarkMode(!darkMode)}
        style={{
          padding: 10,
          backgroundColor: darkMode ? "#444" : "#ddd",
          color: darkMode ? "white" : "black",
          borderRadius: 5,
          marginBottom: 15,
        }}
      >
        {darkMode ? "Açık Moda Geç" : "Karanlık Moda Geç"}
      </Text>


      {/* -------- TEST MODE -------- */}
      <Text
        onPress={() => setTestMode(!testMode)}
        style={{
          padding: 10,
          backgroundColor: testMode ? "#cc0000" : "#ddd",
          color: testMode ? "white" : (darkMode ? "white" : "black"),
          borderRadius: 5,
          marginBottom: 25,
        }}
      >
        {testMode ? "Test Modu: AÇIK" : "Test Modu: KAPALI"}
      </Text>


      {/* -------- KATEGORİ SEÇİMİ -------- */}
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        {categories.map((cat) => (
          <Text
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={{
              padding: 10,
              marginRight: 10,
              borderRadius: 5,
              backgroundColor: selectedCategory === cat ? "#4CAF50" : "#ddd",
              color: selectedCategory === cat ? "white" : (darkMode ? "white" : "black"),
            }}
          >
            {cat}
          </Text>
        ))}
      </View>


      {/* -------- SÜRE SEÇİMİ -------- */}
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        {[10, 15, 25, 45, 60].map((min) => (
          <Text
            key={min}
            onPress={() => {
              setCustomMinutes(min);
              setTime(min * 60);
            }}
            style={{
              padding: 10,
              marginRight: 10,
              borderRadius: 5,
              backgroundColor: customMinutes === min ? "#1976D2" : "#ddd",
              color: customMinutes === min ? "white" : (darkMode ? "white" : "black"),
            }}
          >
            {min} dk
          </Text>
        ))}
      </View>


      {/* -------- TIMER -------- */}
      <Text 
        style={{ 
          fontSize: 40,
          marginBottom: 20,
          color: darkMode ? "white" : "black",
        }}
      >
        {Math.floor(time / 60).toString().padStart(2, "0")}:
        {(time % 60).toString().padStart(2, "0")}
      </Text>


      {/* -------- DİKKAT -------- */}
      <Text 
        style={{ 
          fontSize: 18, 
          marginBottom: 20,
          color: darkMode ? "white" : "black",
        }}
      >
        Dikkat Dağınıklığı: {distractions}
      </Text>


      {/* -------- BAŞLAT/DURAKLAT -------- */}
      <Text
        onPress={() => {
          if (!selectedCategory) {
            alert("Lütfen bir kategori seçin!");
            return;
          }

          if (!isRunning) {
            setStartTime(Date.now());
          }

          setIsRunning(!isRunning);
        }}
        style={{
          padding: 10,
          backgroundColor: isRunning ? "#ff5757" : "#4CAF50",
          color: "white",
          marginBottom: 10,
          borderRadius: 5,
        }}
      >
        {isRunning ? "Duraklat" : "Başlat"}
      </Text>


      {/* -------- SIFIRLA -------- */}
      <Text
        onPress={() => {
          if (time !== customMinutes * 60 && selectedCategory) {
            setSessions((old) => [
              ...old,
              {
                category: selectedCategory,
                duration: customMinutes * 60 - time,
                distractions: distractions,
                date: new Date().toISOString().split("T")[0],
              }
            ]);
          }

          setIsRunning(false);
          setTime(customMinutes * 60);
          setDistractions(0);
          setSelectedCategory(null);
          setStartTime(null);
        }}
        style={{
          padding: 10,
          backgroundColor: "#555",
          color: "white",
          borderRadius: 5,
        }}
      >
        Sıfırla
      </Text>

    </View>
  );
}
