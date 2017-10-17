import {range, sum} from "d3-array";
import {max, tau} from "./math";

function compareValue(compare) {
  return function(a, b) {
    return compare(
      a.source.value + a.target.value,
      b.source.value + b.target.value
    );
  };
}

export default function() {
  var padAngle = 0,
      sortGroups = null,
      sortSubgroups = null,
      sortChords = null;

  function multichord(matrix) {
    var n = matrix.length,
        nCategories = matrix[0][0].length,
        groupSums = {},
        groupIndex = range(n),
        subgroupIndex = [],
        chords = [],
        groups = chords.groups = new Array(n),
        subgroups = chords.subgroups = new Array(n * n),
        z,
        k,
        x,
        x0,
        dx,
        i,
        j;

    // Compute the sum.
    z = 0, i = -1; while (++i < n) {
      if (!groupSums[i]){
        groupSums[i] = {}
      }

      x = 0, j = -1; while (++j < n) {
        if (!groupSums[j]){
          groupSums[j] = {}
        }
        x += sum(matrix[i][j])
        if (!groupSums[i].in){
          groupSums[i].in = sum(matrix[i][j])
        } else {
          groupSums[i].in += sum(matrix[i][j])
        }

        if (!groupSums[j].out){
          groupSums[j].out = sum(matrix[i][j])
        } else {
          groupSums[j].out += sum(matrix[i][j])
        }

      }
      subgroupIndex.push(range(n));
      z += x;
    }

    // Sort groups…
    if (sortGroups) groupIndex.sort(function(a, b) {
      return sortGroups(groupSums[a].in, groupSums[b].in);
    });

    // Sort subgroups…
    if (sortSubgroups) subgroupIndex.forEach(function(d, i) {
      d.sort(function(a, b) {
        return sortSubgroups(sum(matrix[i][a]), sum(matrix[i][b]));
      });
    });

    // Convert the sum to scaling factor for [0, 2pi].
    // TODO Allow start and end angle to be specified?
    // TODO Allow padding to be specified as percentage?
    if (z > 0) {
      z = max(0, tau - padAngle * n) / z;
    }
    dx = z ? padAngle : tau / n;

    // Compute the start and end angle for each group and subgroup.
    // Note: Opera has a bug reordering object literal properties!
    x = 0, i = -1; while (++i < n) {
      x0 = x, j = -1; while (++j < n) {
        var di = groupIndex[i],
            dj = subgroupIndex[di][j],
            v = sum(matrix[di][dj]),
            a0 = x;
            x += v * z;

        subgroups[dj * n + di] = new Array(nCategories), k = -1; while (++k < nCategories) {
            v = matrix[di][dj][k];
            var b0 = a0,
            b1 = a0 += v * z;

            subgroups[dj * n + di][k] = {
              index: di,
              subindex: dj,
              startAngle: b0,
              endAngle: b1,
              value: v,
              category: k,
            };
          };
        }
        groups[di] = {
          index: di,
          startAngle: x0,
          endAngle: x,
          value: {in: groupSums[di].in,
                  out: groupSums[di].out}
        };
        x += dx;
    }

    // Generate chords for each (non-empty) subgroup-subgroup link.
    i = -1; while (++i < n) {
      j = i - 1; while (++j < n) {
        k = -1; while (++k < nCategories) {
          var source = subgroups[j * n + i][k],
              target = subgroups[i * n + j][k];
          if (source.value || target.value) {
            chords.push(source.value < target.value
                ? {source: target, target: source}
                : {source: source, target: target});
          }
        }
      }
    }

    return sortChords ? chords.sort(sortChords) : chords;
  }

  multichord.padAngle = function(_) {
    return arguments.length ? (padAngle = max(0, _), multichord) : padAngle;
  };

  multichord.sortGroups = function(_) {
    return arguments.length ? (sortGroups = _, multichord) : sortGroups;
  };

  multichord.sortSubgroups = function(_) {
    return arguments.length ? (sortSubgroups = _, multichord) : sortSubgroups;
  };

  multichord.sortChords = function(_) {
    return arguments.length ? (_ == null ? sortChords = null : (sortChords = compareValue(_))._ = _, multichord) : sortChords && sortChords._;
  };

  return multichord;
}
