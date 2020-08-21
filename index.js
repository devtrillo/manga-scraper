const onePunchMan = require("./src/one-punch-man");
const helpers = require("./src/helpers");
const puppeteer = require("puppeteer");

const downloadAllComics = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const res = await Promise.all([onePunchMan(browser)]);
  await browser.close();
  return res;
};

 downloadAllComics().then(console.log).catch(console.error);

const images = [
  "https://1.bp.blogspot.com/-K0pWbCQ7sD0/XcxG6WUoDsI/AAAAAAAAAAQ/K8I7hlfl8kYSgNgrJ_eUVpV2yIuyLDLTACLcBGAsYHQ/s1600/005.jpg",
  "https://1.bp.blogspot.com/-j4sgdeUHrfs/XcxG6ZDKWRI/AAAAAAAAAAU/8REQErhKNSkXq5JfqaYHzUlN46yR4JoRgCLcBGAsYHQ/s1600/006.jpg",
  "https://1.bp.blogspot.com/-KdFaEW14xrA/XcxG6ai35jI/AAAAAAAAAAM/CqKn-pgNoPMAPHIMn-Dwol8OT2_hON4uwCLcBGAsYHQ/s1600/007.jpg",
  "https://1.bp.blogspot.com/-wIyrrsTxZNk/XcxG7EBgZlI/AAAAAAAAAAY/7XIxb1n6fKY2SYCI2gH9VtXxLd3l6wy-ACLcBGAsYHQ/s1600/008.jpg",
  "https://1.bp.blogspot.com/-zDJYneIcdJg/XcxG7e-yVrI/AAAAAAAAAAc/QuGU66-DMHMMWxbAHK30Jgqn0mtmqRVNwCLcBGAsYHQ/s1600/009.jpg",
  "https://1.bp.blogspot.com/-Y7k97lRaUpY/XcxG7S1NNDI/AAAAAAAAAAg/YCDyf6f_Gz8MMp3kf6NJKq8ZtQ3kMG4QwCLcBGAsYHQ/s1600/010.jpg",
  "https://1.bp.blogspot.com/-kwdOfwup-Yw/XcxG7xIxRVI/AAAAAAAAAAk/rfSjQQL5l_gZRrlEUN_MW4qSwckLKjZjQCLcBGAsYHQ/s1600/011.jpg",
  "https://1.bp.blogspot.com/-z6PGsIhHFN8/XcxG7-sPgqI/AAAAAAAAAAs/mAo2z8A7e2Y-v5N-9kRXvIGSDmYxmsCDACLcBGAsYHQ/s1600/012.jpg",
  "https://1.bp.blogspot.com/-IFBPuGgCxnM/XcxG8Dxx0wI/AAAAAAAAAAo/h09MpCEj9BcWzHp2DsTPspzsDfKUZJVLwCLcBGAsYHQ/s1600/013.jpg",
  "https://1.bp.blogspot.com/-_XIdwrE5ed8/XcxG8e3lh2I/AAAAAAAAAAw/OyeyDUvZf9kX7O52cqExPvezaoOJq4D9ACLcBGAsYHQ/s1600/014.jpg",
  "https://1.bp.blogspot.com/-e0KzQdwyyP8/XcxG8gL2M5I/AAAAAAAAAA4/K3px6PzEIXseUA4pAf4TX1ib5qT8KHSmwCLcBGAsYHQ/s1600/015.jpg",
  "https://1.bp.blogspot.com/-8Oeg2_Wd9qk/XcxG8lAWOII/AAAAAAAAAA0/uL1kN65TkTUNEgGpfnLv_CzGl1rkbFO4ACLcBGAsYHQ/s1600/016.jpg",
  "https://1.bp.blogspot.com/-3c_5vPcpweg/XcxG86P3y3I/AAAAAAAAAA8/djD-TZAYbU0eD_osfXC0PkEZHBPtScgpwCLcBGAsYHQ/s1600/017.jpg",
  "https://1.bp.blogspot.com/-JZQ5OWGOhBM/XcxG9RVFB0I/AAAAAAAAABA/k6zITnQqEnkvL5TK5T6XJ3kD9sfvHZdVwCLcBGAsYHQ/s1600/018.jpg",
  "https://1.bp.blogspot.com/-3tquTYTj8ew/XcxG9ulr2HI/AAAAAAAAABE/5GdKlx1IXkgdbU9eoHY-Wo_YXpnCRC-IwCLcBGAsYHQ/s1600/019.jpg",
  "https://1.bp.blogspot.com/-j8QRcQF_zNQ/XcxG-CK1rwI/AAAAAAAAABI/Qp4-a8du5-oIVPZit0Qvhuhqfax5PstlgCLcBGAsYHQ/s1600/020.jpg",
  "https://1.bp.blogspot.com/-k7xaTQ3Pg2M/XcxG-TVroeI/AAAAAAAAABM/a1_BuSVDSsgcS5qRnkoA4Fwfu5E0p79eACLcBGAsYHQ/s1600/021.jpg",
  "https://1.bp.blogspot.com/-vDE5WCTNXko/XcxG-qJVZwI/AAAAAAAAABQ/G8IdDMiTuVQFoJTIRKj-xegOaWPwP6KqQCLcBGAsYHQ/s1600/022.jpg",
  "https://1.bp.blogspot.com/-KP3GXWLmZmw/XcxG-89J8GI/AAAAAAAAABU/PWy4VLe1anQ_yBWYd9ZHwiRoTt4LJyynQCLcBGAsYHQ/s1600/023.jpg",
  "https://1.bp.blogspot.com/-_V-Jmxhwj_A/XcxG-x9D6YI/AAAAAAAAABY/GUxttk8ULUYdm2nl-TTAIlUJFfUZLHQUwCLcBGAsYHQ/s1600/024.jpg",
  "https://1.bp.blogspot.com/-lhRDzidbX7c/XcxHGmQabeI/AAAAAAAAABc/3X-1pPA3qZUGjVjZzjEMDpn92T2U6mCsgCLcBGAsYHQ/s1600/025.jpg",
];
const test = async () => {
  await helpers.createFolderStructure("test");

  await helpers.downloadImage(images[0],'comics/test/img0010.jpeg')

};
// test().catch(console.error).then(console.log);
