const MS_PER_DAY = 1000 * 60 * 60 * 24;

export default DateUtil = {
  getDateTime: function(date) {
    let rawDateTime = new Date(date);
    let formattedDate = rawDateTime.toLocaleString('ru', {
      month: 'long',
      day: 'numeric'
    });
    let formattedTime = rawDateTime.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute:'2-digit'
    });

    return formattedDate + ", в " + formattedTime;
  },

  // work-around
  getDateTimeAndroid: function(date) {
    const months = [
      "января", "февраля", "марта", "апреля", "мая", "июня", "июля",
      "августа", "сентября", "октября", "ноября", "декабря"
    ];

    date = new Date(date);
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    const formattedDate = date.getDate() + " " + months[date.getMonth()];
    const formattedTime = date.getHours() + ":" + minutes;

    return formattedDate + ", в " + formattedTime;
  }
}