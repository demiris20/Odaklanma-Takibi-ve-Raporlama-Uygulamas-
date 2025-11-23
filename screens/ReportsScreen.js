import { View, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { ScrollView } from "react-native";





export default function ReportsScreen({ sessions }) {

    const screenWidth = Dimensions.get("window").width;


  // --- TOPLAM SÜRELER ---
  let totalDuration = 0;
  let totalDistractions = 0;

  sessions.forEach((s) => {
    totalDuration += s.duration;
    totalDistractions += s.distractions;
  });

  let totalMinutes = Math.floor(totalDuration / 60);

  // --- BUGÜNÜN SÜRESİ ---
  let today = new Date().toISOString().split("T")[0];
  let todayDuration = 0;

  sessions.forEach((s) => {
    if (s.date === today) {
      todayDuration += s.duration;
    }
  });

  let todayMinutes = Math.floor(todayDuration / 60);

  // --- SON 7 GÜNÜN TARİHLERİ ---
  let last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    last7Days.push(date.toISOString().split("T")[0]);
  }

  // --- SON 7 GÜN VERİLERİ (DAKİKA) ---
  let last7DaysData = last7Days.map((day) => {
    let total = 0;
    sessions.forEach((s) => {
      if (s.date === day) {
        total += s.duration;
      }
    });
    return Math.floor(total / 60);
  });

  // Şu an last7DaysData grafiğe hazır:
  // Örn → [20, 10, 0, 30, 45, 5, 12]

  const barData = {
  labels: ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"],
  datasets: [
    {
      data: last7DaysData
    }
  ]
};

// --- KATEGORİLERE GÖRE TOPLAM SÜRE ---
let categoryTotals = {};

sessions.forEach((s) => {
  if (!categoryTotals[s.category]) {
    categoryTotals[s.category] = 0;
  }
  categoryTotals[s.category] += s.duration;
});

// Pie Chart formatına dönüştür
let pieData = Object.keys(categoryTotals).map((cat) => ({
  name: cat,
  total: Math.floor(categoryTotals[cat] / 60), // dakika
  color: "#" + Math.floor(Math.random() * 16777215).toString(16),
  legendFontColor: "#333",
  legendFontSize: 14
}));



  return (
    <View style={{ flex: 1, padding: 20 }}>

      {/* İSTATİSTİK KUTUSU */}
      <View
        style={{
          padding: 15,
          backgroundColor: "#dde",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text>Bugün: {todayMinutes} dakika</Text>
        <Text>Toplam Süre: {totalMinutes} dakika</Text>
        <Text>Toplam Dikkat Dağınıklığı: {totalDistractions}</Text>
      </View>

      <Text style={{ fontSize: 20, marginBottom: 10 }}>Son 7 Gün Odaklanma Süresi</Text>

<BarChart
  data={barData}
  width={screenWidth * 0.95}
  height={220}
  chartConfig={{
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#f5f5f5",
    backgroundGradientTo: "#e0e0e0",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: () => "#000"
  }}
  style={{
    marginBottom: 20,
    borderRadius: 10,
  }}
/>

<Text style={{ fontSize: 20, marginBottom: 10 }}>Kategori Dağılımı</Text>

<PieChart
  data={pieData}
  width={screenWidth * 0.95}
  height={220}
  chartConfig={{
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#f5f5f5",
    backgroundGradientTo: "#e0e0e0",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: () => "#000",
  }}
  accessor="total"
  backgroundColor="transparent"
  paddingLeft="15"
  absolute
/>

      <Text style={{ fontSize: 24, marginBottom: 20 }}>Kayıtlı Seanslar</Text>

    <ScrollView style={{ flex: 1, marginBottom: 40 }}>
  {sessions.length === 0 ? (
    <Text>Henüz kayıt yok.</Text>
  ) : (
    sessions.map((session, index) => (
      <View
        key={index}
        style={{
          padding: 10,
          marginBottom: 10,
          backgroundColor: "#eee",
          borderRadius: 5,
        }}
      >
        <Text>Kategori: {session.category}</Text>
        <Text>Süre: {Math.floor(session.duration / 60)} dk {session.duration % 60} sn</Text>
        <Text>Dikkat Dağınıklığı: {session.distractions}</Text>
        <Text>Tarih: {session.date}</Text>
      </View>
    ))
  )}
</ScrollView>


    </View>
  );
}
