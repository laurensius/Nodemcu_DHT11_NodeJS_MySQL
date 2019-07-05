function loadData() {
  $.ajax({
    url: "/api/grafik",
    type: "GET",
    dataType: "json",
    success: function(response) {
      console.log(response);
      if (
        response.severity === "success" &&
        response.content.sensor.length > 0
      ) {
        var labels = new Array(response.content.sensor.length);
        var data_suhu_1 = new Array(response.content.sensor.length);
        var data_suhu_2 = new Array(response.content.sensor.length);
        var data_kelembaban_1 = new Array(response.content.sensor.length);
        var data_kelembaban_2 = new Array(response.content.sensor.length);
        var y = 0;
        for (var x = response.content.sensor.length - 1; x >= 0; x--) {
          labels[y] = response.content.sensor[x].datetime;
          data_suhu_1[y] = response.content.sensor[x].suhu_1;
          data_suhu_2[y] = response.content.sensor[x].suhu_2;
          data_kelembaban_1[y] = response.content.sensor[x].kelembaban_1;
          data_kelembaban_2[y] = response.content.sensor[x].kelembaban_2;
          y++;
        }

        var ctx_suhu = document.getElementById("myChartSuhu");
        var ctx_kelembaban = document.getElementById("myChartKelembaban");
        var myChart = new Chart(ctx_suhu, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Suhu Sensor 1",
                data: data_suhu_1,
                backgroundColor: ["rgba(66, 245, 120,0.2)"],
                borderColor: ["rgba(66, 245, 120,1)"],
                borderWidth: 1.5
              },
              {
                label: "Suhu Sensor 2",
                data: data_suhu_2,
                backgroundColor: ["rgba(245, 20, 230,0.2)"],
                borderColor: ["rgba(245, 20, 230,1)"],
                borderWidth: 1.5
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
        var myChart = new Chart(ctx_kelembaban, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Kelembaban Sensor 1",
                data: data_kelembaban_1,
                backgroundColor: ["rgba(66, 236, 245,0.2)"],
                borderColor: ["rgba(66, 236, 245,1)"],
                borderWidth: 1.5
              },
              {
                label: "Kelembaban Sensor 2",
                data: data_kelembaban_2,
                backgroundColor: ["rgba(255, 227, 87,0.2)"],
                borderColor: ["rgba(255, 227, 87,1)"],
                borderWidth: 1.5
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
    },
    error: function(response) {
      alert(error);
    },
    cache: false,
    contentType: false,
    processData: false
  });
}

loadData();

setInterval(function() {
  loadData();
}, 5000);
