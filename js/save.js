function loopAssign(x, y) {
  
    for (var key in y) {
        if (!y.hasOwnProperty(key)) continue;
        if (typeof y[key] == "object") {
            loopAssign(x[key],y[key])
        }
        else {
            x[key] = y[key]
        }
    }
    return x
}

function save() {
  localStorage.game = JSON.stringify(player)
}

function load() {
  if (typeof localStorage.game != "undefined") player = loopAssign(player, JSON.parse(localStorage.game))
}