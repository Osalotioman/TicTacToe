//localStorage.test += 's'

var default_settings_items = {
    "page": "page1",
    "playWith": "computer",
    "computerGoes" : "first",
    "symbolGoesFirst" : "O"
}

var a = 1;
var b = 2; 
var c = 3; 
var tl = ["_", "_"]; 
var con1 = ["", false, 0];

var con1l = [[[c, 3], [c, 2], [b, 3]],
         [[a, 3], [a, 2], [b, 3]],
         [[a, 1], [b, 1], [a, 2]],
         [[c, 1], [b, 1], [c, 2]]
        ];
var con2 = 0;
var con2l = [[[a, 2], [c, 1], [c, 3]],
         [[b, 3], [a, 1], [a, 3]],
         [[c, 2], [a, 1], [a, 3]],
         [[b, 1], [a, 3], [c, 3]]
        ];

if(default_settings_items["symbolGoesFirst"] == "X"){tl = ["X", "O"];}else{tl = ["O", "X"];}

var t = 0;
var gp = 0;
var gpl = [];
var ava = false;

var board = [["_", "_", "_"],
         ["_", "_", "_"],
         ["_", "_", "_"]]; 
         
var boardn = [["a3", "b3", "c3"],
          ["a2", "b2", "c2"],
          ["a1", "b1", "c1"]];

var wl = [[[a, 1], [b, 1], [c, 1]],
      [[a, 2], [b, 2], [c, 2]],
      [[a, 3], [b, 3], [c, 3]],
      [[a, 1], [a, 2], [a, 3]],
      [[b, 1], [b, 2], [b, 3]],
      [[c, 1], [c, 2], [c, 3]],
      [[a, 3], [b, 2], [c, 1]],
      [[c, 3], [b, 2], [a, 1]]
  ];
var symbolGoesFirst_Count = 0;