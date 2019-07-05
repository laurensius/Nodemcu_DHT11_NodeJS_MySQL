function loadData() {
  // sensor 1
  var opts_suhu_1 = {
    width: 1000,
    angle: 0,
    lineWidth: 0.44,
    radiusScale: 1,
    pointer: {
      length: 0.6,
      strokeWidth: 0.035,
      color: "#000000"
    },
    limitMax: true,
    limitMin: false,
    colorStart: "#6FADCF",
    colorStop: "#8FC0DA",
    strokeColor: "#E0E0E0",
    generateGradient: true,
    highDpiSupport: true,
    staticZones: [
      { strokeStyle: "#FFDD00", min: 0, max: 35 }, // Yellow
      { strokeStyle: "#30B32D", min: 36, max: 39 }, // Green
      { strokeStyle: "#F03E3E", min: 40, max: 100 } // Red
    ],
    staticLabels: {
      font: "10px sans-serif",
      labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      color: "#000000",
      fractionDigits: 0
    }
  };

  var target_suhu_1 = document.getElementById("gauge_suhu_1");
  var gauge_suhu_1 = new Gauge(target_suhu_1).setOptions(opts_suhu_1);
  gauge_suhu_1.maxValue = 100;
  gauge_suhu_1.setMinValue(0);
  gauge_suhu_1.animationSpeed = 32;

  var opts_kelembaban_1 = {
    angle: 0,
    lineWidth: 0.44,
    radiusScale: 1,
    pointer: {
      length: 0.6,
      strokeWidth: 0.035,
      color: "#000000"
    },
    limitMax: true,
    limitMin: false,
    colorStart: "#6FADCF",
    colorStop: "#8FC0DA",
    strokeColor: "#E0E0E0",
    generateGradient: true,
    highDpiSupport: true,
    staticZones: [
      { strokeStyle: "#FFDD00", min: 0, max: 49 }, // Yellow
      { strokeStyle: "#30B32D", min: 50, max: 60 }, // Green
      { strokeStyle: "#F03E3E", min: 61, max: 100 } // Red
    ],
    staticLabels: {
      font: "10px sans-serif",
      labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      color: "#000000",
      fractionDigits: 0
    }
  };
  var target_kelembaban_1 = document.getElementById("gauge_kelembaban_1");
  var gauge_kelembaban_1 = new Gauge(target_kelembaban_1).setOptions(
    opts_kelembaban_1
  );
  gauge_kelembaban_1.maxValue = 100;
  gauge_kelembaban_1.setMinValue(0);
  gauge_kelembaban_1.animationSpeed = 32;

  // Sensor 2
  var opts_suhu_2 = {
    width: 1000,
    angle: 0,
    lineWidth: 0.44,
    radiusScale: 1,
    pointer: {
      length: 0.6,
      strokeWidth: 0.035,
      color: "#000000"
    },
    limitMax: true,
    limitMin: false,
    colorStart: "#6FADCF",
    colorStop: "#8FC0DA",
    strokeColor: "#E0E0E0",
    generateGradient: true,
    highDpiSupport: true,
    staticZones: [
      { strokeStyle: "#FFDD00", min: 0, max: 35 }, // Yellow
      { strokeStyle: "#30B32D", min: 36, max: 39 }, // Green
      { strokeStyle: "#F03E3E", min: 40, max: 100 } // Red
    ],
    staticLabels: {
      font: "10px sans-serif",
      labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      color: "#000000",
      fractionDigits: 0
    }
  };

  var target_suhu_2 = document.getElementById("gauge_suhu_2");
  var gauge_suhu_2 = new Gauge(target_suhu_2).setOptions(opts_suhu_2);
  gauge_suhu_2.maxValue = 100;
  gauge_suhu_2.setMinValue(0);
  gauge_suhu_2.animationSpeed = 32;

  var opts_kelembaban_2 = {
    angle: 0,
    lineWidth: 0.44,
    radiusScale: 1,
    pointer: {
      length: 0.6,
      strokeWidth: 0.035,
      color: "#000000"
    },
    limitMax: true,
    limitMin: false,
    colorStart: "#6FADCF",
    colorStop: "#8FC0DA",
    strokeColor: "#E0E0E0",
    generateGradient: true,
    highDpiSupport: true,
    staticZones: [
      { strokeStyle: "#FFDD00", min: 0, max: 49 }, // Yellow
      { strokeStyle: "#30B32D", min: 50, max: 60 }, // Green
      { strokeStyle: "#F03E3E", min: 61, max: 100 } // Red
    ],
    staticLabels: {
      font: "10px sans-serif",
      labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      color: "#000000",
      fractionDigits: 0
    }
  };
  var target_kelembaban_2 = document.getElementById("gauge_kelembaban_2");
  var gauge_kelembaban_2 = new Gauge(target_kelembaban_2).setOptions(
    opts_kelembaban_2
  );
  gauge_kelembaban_2.maxValue = 100;
  gauge_kelembaban_2.setMinValue(0);
  gauge_kelembaban_2.animationSpeed = 32;

  // Ajax
  $.ajax({
    url: "/api/recent",
    type: "GET",
    dataType: "json",
    success: function(response) {
      console.log(response);
      if (
        response.severity === "success" &&
        response.content.sensor.length > 0
      ) {
        var suhu_1 = response.content.sensor[0].suhu_1;
        $("#suhu_1").html(suhu_1);
        gauge_suhu_1.set(suhu_1);

        var kelembaban_1 = response.content.sensor[0].kelembaban_1;
        $("#kelembaban_1").html(kelembaban_1);
        gauge_kelembaban_1.set(kelembaban_1);

        var suhu_2 = response.content.sensor[0].suhu_2;
        $("#suhu_2").html(suhu_2);
        gauge_suhu_2.set(suhu_2);

        var kelembaban_2 = response.content.sensor[0].kelembaban_2;
        $("#kelembaban_2").html(kelembaban_2);
        gauge_kelembaban_2.set(kelembaban_2);

        var tanggal = new Date(response.content.sensor[0].datetime);
        $("#datetime").html(tanggal.toString());
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

setInterval(function() {
  loadData();
}, 5000);
