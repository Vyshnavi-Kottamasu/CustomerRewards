class dateHelper {
  static parseDate(dateString) {
    return new Date(dateString);
  }
  static getMonth(date) {
    return date.toLocaleString('default', { month: 'long' });
  }
}

export default dateHelper;
