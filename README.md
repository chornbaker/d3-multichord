# d3-multichord

###This is a modification of `d3-chord` to enable another dimension of data to be shown between nodes.

Circular layout for visualizing relationships or network flows with multiple types. 

## Installing

If you use NPM, `npm install d3-multichord`. Otherwise, download the [latest release](https://github.com/chornbaker/d3-multichord/releases/latest).

## API Reference

This module is an adaptation of [d3-chord](https://github.com/d3/d3-chord). Only the changes relevant to the multichord version are included here. 

<a href="#multichord" name="multichord">#</a> d3.<b>multichord</b>() [<>](https://github.com/chornbaker/d3-multichord/blob/master/src/multichord.js "Source")

Constructs a new multichord layout with the default settings.

<a href="#_chord" name="_chord">#</a> <i>chord</i>(<i>matrix</i>) [<>](https://github.com/chornbaker/d3-multichord/blob/master/src/multichord.js#L19 "Source")

Computes the chord layout for the specified *three-dimensional* *matrix* of shape *n*×*n*×*m*, where the *matrix* represents the directed flow amongst a network (a complete digraph) of *n* nodes, and links between nodes are classified into *m* categories. The given *matrix* must be an array of length *n*, where each element *matrix*[*i*] is an array of *n* numbers, where each *matrix*[*i*][*j*] represents the flow from the *i*th node in the network to the *j*th node, and each element *matrix*[*i*][*j*][*k*] is a an array of length *m* that represents the value of the flow from each of *m* categories. Each number within *matrix*[*i*][*j*][*k*] must be nonnegative, though it can be zero if there is no flow from node *i* to node *j* for that category. 

Sample data from the [US Census Migration Data by Nativity Example](https://bl.ocks.org/chornbaker/251c1f9aa12eed2cedcef8fc33b76df0):

```js
var matrix = [
    [[0,0,0],[49,0,6],[236,1,18],[135,11,6]],
    [[37,1,9],[0,0,0],[230,9,19],[94,3,0]],
    [[295,6,24],[282,8,25],[0,0,0],[323,18,29]],
    [[181,5,16],[107,13,13],[195,6,26],[0,0,0]]
];
```

The *chords* array also defines a secondary array of length *n*, *chords*.groups, where each group represents the combined inflow and outflow for node *i*, corresponding to the sum of the elements in *matrix*[*i*][0 … *n* - 1][0 … *m* - 1], and is an object with the following properties:

* `startAngle` - the start angle in radians
* `endAngle` - the end angle in radians
* `value` - `in`: the total incoming flow value for node *i*; `out`: the total outgoing flow value for node *i*
* `index` - the node index *i*
