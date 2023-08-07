class Place {
  constructor(title, imageUrl, address, location) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.address = address;
    this.location = location; //{ lat: , lng: }
    this.id = new Date().toString + Math.random().toString();
  }
}
