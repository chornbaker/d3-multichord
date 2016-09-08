var tape = require("tape"),
    d3 = require("../");

require("./inDelta");

// Sample data derived from http://www.census.gov/data/tables/2015/demo/geographic-mobility/cps-2015.html
//   Table 12. Migration flows between regions by nativity: 2014-2015 (in thousands)
var matrix = [
    [[0,0,0],[49,0,6],[236,1,18],[135,11,6]],
    [[37,1,9],[0,0,0],[230,9,19],[94,3,0]],
    [[295,6,24],[282,8,25],[0,0,0],[323,18,29]],
    [[181,5,16],[107,13,13],[195,6,26],[0,0,0]]
];
  
tape("d3.multichord() has the expected defaults", function(test) {
  var multichord = d3.multichord();
  test.equal(multichord.padAngle(), 0);
  test.equal(multichord.sortGroups(), null);
  test.equal(multichord.sortSubgroups(), null);
  test.equal(multichord.sortChords(), null);
  var chords = multichord(matrix);
  test.inDelta(chords.groups, [
    {index: 0, startAngle: 0, endAngle: 1.191638592740956, value: {in: 462, out: 574}},
    {index: 1, startAngle: 1.191638592740956, endAngle: 2.228518926684385, value: {in: 402, out: 503}},
    {index: 2, startAngle: 2.228518926684385, endAngle: 4.833616283109419, value: {in: 1010, out: 740}},
    {index: 3, startAngle: 4.833616283109419, endAngle: 6.283185307179586, value: {in: 562, out: 619}}
  ]);
  test.inDelta(chords, [{
    source: {index: 0, subindex: 1, startAngle: 0, endAngle: 0.12638591135131352, value: 49, category: 0}, 
    target: {index: 1, subindex: 0, startAngle: 1.191638592740956, endAngle: 1.2870728523327641, value: 37, category: 0}}, {
    source: {index: 1, subindex: 0, startAngle: 1.2870728523327641, endAngle: 1.2896521566460561, value: 1, category: 1}, 
    target: {index: 0, subindex: 1, startAngle: 0.12638591135131352, endAngle: 0.12638591135131352, value: 0, category: 1}}, {
    source: {index: 1, subindex: 0, startAngle: 1.2896521566460561, endAngle: 1.312865895465685, value: 9, category: 2}, 
    target: {index: 0, subindex: 1, startAngle: 0.12638591135131352, endAngle: 0.1418617372310662, value: 6, category: 2}}, {
    source: {index: 2, subindex: 0, startAngle: 2.228518926684385, endAngle: 2.989413699105558, value: 295, category: 0}, 
    target: {index: 0, subindex: 2, startAngle: 0.14186173723106618, endAngle: 0.7505775551680047, value: 236, category: 0}}, {
    source: {index: 2, subindex: 0, startAngle: 2.989413699105558, endAngle: 3.0048895249853107, value: 6, category: 1}, 
    target: {index: 0, subindex: 2, startAngle: 0.7505775551680047, endAngle: 0.7531568594812968, value: 1, category: 1}}, {
    source: {index: 2, subindex: 0, startAngle: 3.0048895249853107, endAngle: 3.0667928285043216, value: 24, category: 2}, 
    target: {index: 0, subindex: 2, startAngle: 0.7531568594812968, endAngle: 0.7995843371205549, value: 18, category: 2}}, {
    source: {index: 3, subindex: 0, startAngle: 4.833616283109419, endAngle: 5.3004703638152915, value: 181, category: 0}, 
    target: {index: 0, subindex: 3, startAngle: 0.7995843371205549, endAngle: 1.14779041941499, value: 135, category: 0}}, {
    source: {index: 0, subindex: 3, startAngle: 1.14779041941499, endAngle: 1.1761627668612031, value: 11, category: 1}, 
    target: {index: 3, subindex: 0, startAngle: 5.3004703638152915, endAngle: 5.313366885381752, value: 5, category: 1}}, {
    source: {index: 3, subindex: 0, startAngle: 5.313366885381752, endAngle: 5.354635754394426, value: 16, category: 2}, 
    target: {index: 0, subindex: 3, startAngle: 1.1761627668612031, endAngle: 1.1916385927409558, value: 6, category: 2}}, {
    source: {index: 2, subindex: 1, startAngle: 3.0667928285043216, endAngle: 3.794156644852697, value: 282, category: 0}, 
    target: {index: 1, subindex: 2, startAngle: 1.3128658954656853, endAngle: 1.9061058875228714, value: 230, category: 0}}, {
    source: {index: 1, subindex: 2, startAngle: 1.9061058875228714, endAngle: 1.9293196263425003, value: 9, category: 1}, 
    target: {index: 2, subindex: 1, startAngle: 3.794156644852697, endAngle: 3.814791079359034, value: 8, category: 1}}, {
    source: {index: 2, subindex: 1, startAngle: 3.814791079359034, endAngle: 3.8792736871913367, value: 25, category: 2}, 
    target: {index: 1, subindex: 2, startAngle: 1.9293196263425003, endAngle: 1.9783264082950505, value: 19, category: 2}}, {
    source: {index: 3, subindex: 1, startAngle: 5.354635754394425, endAngle: 5.630621315916681, value: 107, category: 0}, 
    target: {index: 1, subindex: 3, startAngle: 1.9783264082950502, endAngle: 2.2207810137445088, value: 94, category: 0}}, {
    source: {index: 3, subindex: 1, startAngle: 5.630621315916681, endAngle: 5.664152271989479, value: 13, category: 1}, 
    target: {index: 1, subindex: 3, startAngle: 2.2207810137445088, endAngle: 2.228518926684385, value: 3, category: 1}}, {
    source: {index: 3, subindex: 1, startAngle: 5.664152271989479, endAngle: 5.697683228062276, value: 13, category: 2}, 
    target: {index: 1, subindex: 3, startAngle: 2.228518926684385, endAngle: 2.228518926684385, value: 0, category: 2}}, {
    source: {index: 2, subindex: 3, startAngle: 3.879273687191337, endAngle: 4.71238898038469, value: 323, category: 0}, 
    target: {index: 3, subindex: 2, startAngle: 5.697683228062276, endAngle: 6.200647569154238, value: 195, category: 0}}, {
    source: {index: 2, subindex: 3, startAngle: 4.71238898038469, endAngle: 4.758816458023948, value: 18, category: 1}, 
    target: {index: 3, subindex: 2, startAngle: 6.200647569154238, endAngle: 6.216123395033991, value: 6, category: 1}}, {
    source: {index: 2, subindex: 3, startAngle: 4.758816458023948, endAngle: 4.83361628310942, value: 29, category: 2}, 
    target: {index: 3, subindex: 2, startAngle: 6.216123395033991, endAngle: 6.283185307179586, value: 26, category: 2}}
  ]);
  test.end();
});

tape("multichord.padAngle(angle) sets the pad angle", function(test) {
  var multichord = d3.multichord().sortSubgroups(function(a, b) { return b - a; });
  test.equal(multichord.padAngle(0.05), multichord);
  test.equal(multichord.padAngle(), 0.05);
  var chords = multichord(matrix);
  test.inDelta(chords.groups, [{
    index: 0, startAngle: 0, endAngle: 1.1537075582581975, value: {in: 462, out: 574}}, {
    index: 1, startAngle: 1.2037075582581975, endAngle: 2.2075829660932524, value: {in: 402, out: 503}}, {
    index: 2, startAngle: 2.2575829660932523, endAngle: 4.779757498216151, value: {in: 1010, out: 740}}, {
    index: 3, startAngle: 4.829757498216151, endAngle: 6.2331853071795855, value: {in: 562, out: 619}}
  ]);
  test.inDelta(chords, [{source: {index: 0, subindex: 1, startAngle: 1.0163614203703168, endAngle: 1.1387243432158833, value: 49, category: 0}, 
    target: {index: 1, subindex: 0, startAngle: 2.090214448261791, endAngle: 2.1826109410227286, value: 37, category: 0}}, {
    source: {index: 1, subindex: 0, startAngle: 2.1826109410227286, endAngle: 2.185108143529781, value: 1, category: 1}, 
    target: {index: 0, subindex: 1, startAngle: 1.1387243432158833, endAngle: 1.1387243432158833, value: 0, category: 1}}, {
    source: {index: 1, subindex: 0, startAngle: 2.185108143529781, endAngle: 2.2075829660932524, value: 9, category: 2}, 
    target: {index: 0, subindex: 1, startAngle: 1.1387243432158833, endAngle: 1.1537075582581975, value: 6, category: 2}}, {
    source: {index: 2, subindex: 0, startAngle: 3.181547893702631, endAngle: 3.918222633283082, value: 295, category: 0}, 
    target: {index: 0, subindex: 2, startAngle: 0, endAngle: 0.5893397916643606, value: 236, category: 0}}, {
    source: {index: 2, subindex: 0, startAngle: 3.918222633283082, endAngle: 3.933205848325396, value: 6, category: 1}, 
    target: {index: 0, subindex: 2, startAngle: 0.5893397916643606, endAngle: 0.5918369941714129, value: 1, category: 1}}, {
    source: {index: 2, subindex: 0, startAngle: 3.933205848325396, endAngle: 3.9931387084946532, value: 24, category: 2}, 
    target: {index: 0, subindex: 2, startAngle: 0.5918369941714129, endAngle: 0.6367866392983557, value: 18, category: 2}}, {
    source: {index: 3, subindex: 0, startAngle: 5.39662246731704, endAngle: 5.84861612109352, value: 181, category: 0}, 
    target: {index: 0, subindex: 3, startAngle: 0.6367866392983558, endAngle: 0.9739089777504264, value: 135, category: 0}}, {
    source: {index: 0, subindex: 3, startAngle: 0.9739089777504264, endAngle: 1.0013782053280025, value: 11, category: 1}, 
    target: {index: 3, subindex: 0, startAngle: 5.84861612109352, endAngle: 5.861102133628782, value: 5, category: 1}}, {
    source: {index: 3, subindex: 0, startAngle: 5.861102133628782, endAngle: 5.90105737374162, value: 16, category: 2}, 
    target: {index: 0, subindex: 3, startAngle: 1.0013782053280025, endAngle: 1.0163614203703166, value: 6, category: 2}}, {
    source: {index: 2, subindex: 1, startAngle: 3.9931387084946532, endAngle: 4.697349815483423, value: 282, category: 0}, 
    target: {index: 1, subindex: 2, startAngle: 1.2037075582581975, endAngle: 1.778064134880244, value: 230, category: 0}}, {
    source: {index: 1, subindex: 2, startAngle: 1.778064134880244, endAngle: 1.8005389574437154, value: 9, category: 1}, 
    target: {index: 2, subindex: 1, startAngle: 4.697349815483423, endAngle: 4.717327435539842, value: 8, category: 1}}, {
    source: {index: 2, subindex: 1, startAngle: 4.717327435539842, endAngle: 4.779757498216151, value: 25, category: 2}, 
    target: {index: 1, subindex: 2, startAngle: 1.8005389574437154, endAngle: 1.8479858050777105, value: 19, category: 2}}, {
    source: {index: 3, subindex: 1, startAngle: 5.90105737374162, endAngle: 6.168258041996224, value: 107, category: 0}, 
    target: {index: 1, subindex: 3, startAngle: 1.8479858050777103, endAngle: 2.0827228407406335, value: 94, category: 0}}, {
    source: {index: 3, subindex: 1, startAngle: 6.168258041996224, endAngle: 6.200721674587905, value: 13, category: 1}, 
    target: {index: 1, subindex: 3, startAngle: 2.0827228407406335, endAngle: 2.090214448261791, value: 3, category: 1}}, {
    source: {index: 3, subindex: 1, startAngle: 6.200721674587905, endAngle: 6.233185307179586, value: 13, category: 2}, 
    target: {index: 1, subindex: 3, startAngle: 2.090214448261791, endAngle: 2.090214448261791, value: 0, category: 2}}, {
    source: {index: 2, subindex: 3, startAngle: 2.2575829660932523, endAngle: 3.0641793758711695, value: 323, category: 0}, 
    target: {index: 3, subindex: 2, startAngle: 4.829757498216151, endAngle: 5.316711987091364, value: 195, category: 0}}, {
    source: {index: 2, subindex: 3, startAngle: 3.0641793758711695, endAngle: 3.1091290209981124, value: 18, category: 1}, 
    target: {index: 3, subindex: 2, startAngle: 5.316711987091364, endAngle: 5.3316952021336785, value: 6, category: 1}}, {
    source: {index: 2, subindex: 3, startAngle: 3.1091290209981124, endAngle: 3.181547893702631, value: 29, category: 2}, 
    target: {index: 3, subindex: 2, startAngle: 5.3316952021336785, endAngle: 5.39662246731704, value: 26, category: 2}}
  ]);
  test.end();
});