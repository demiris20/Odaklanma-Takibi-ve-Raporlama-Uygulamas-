import React, { useState, useEffect } from "react";
import { View, Text, AppState } from "react-native";

export default function HomeScreen({ sessions, setSessions }) {
    
  const [time, setTime] = useState(25 * 60); 
  const [isRunning, setIsRunning] = useState(false);

  const categories = ["Ders", "Kodlama", "Proje", "Kitap"];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [distractions, setDistractions] = useState(0);

  // ---- TIMER ----
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {

          if (prev <= 1) {

            // Seans bittiğinde kaydet
            setSessions((old) => [
              ...old,
              {
                category: selectedCategory,
                duration: 25 * 60 - time,
                distractions: distractions,
                date: new Date().toISOString().split("T")[0],
              }
            ]);

            setIsRunning(false);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    } else if (!isRunning && interval !== null) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);


  // ---- APPSTATE (arka plana geçme) ----
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "background" && isRunning) {
        setIsRunning(false);
        setDistractions((prev) => prev + 1);
      }
    });

    return () => subscription.remove();
  }, [isRunning]);


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      {/* KATEGORI SEÇİMİ */}
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
              color: selectedCategory === cat ? "white" : "black",
            }}
          >
            {cat}
          </Text>
        ))}
      </View>

      {/* TIMER */}
      <Text style={{ fontSize: 40, marginBottom: 20 }}>
        {Math.floor(time / 60).toString().padStart(2, "0")}:
        {(time % 60).toString().padStart(2, "0")}
      </Text>

      {/* DİKKAT */}
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Dikkat Dağınıklığı: {distractions}
      </Text>

      {/* BAŞLAT / DURAKLAT */}
      <Text
        onPress={() => {
          if (!selectedCategory) {
            alert("Lütfen bir kategori seçin!");
            return;
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

      {/* SIFIRLA */}
      <Text
        onPress={() => {
          if (time !== 25 * 60 && selectedCategory) {
            setSessions((old) => [
              ...old,
              {
                category: selectedCategory,
                duration: 25 * 60 - time,
                distractions: distractions,
                date: new Date().toISOString().split("T")[0],
              }
            ]);
          }

          setIsRunning(false);
          setTime(25 * 60);
          setDistractions(0);
          setSelectedCategory(null);
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
