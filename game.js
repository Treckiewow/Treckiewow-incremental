var game = {
    metal: 1000000000000,                //variable gets saved
    totalmetal: 0,                      //variable gets saved
    totalmetalmined: 0,                 //variable gets saved
    metalpersecondtwo: 0,               //variable gets saved
    energy: 0,                    //variable gets saved
    railguninterval: 1800000,      //1800000                   //variable gets saved
    railgunstartinterval: 1800000,  //1800000 
    techpoints: 155500000000,               //variable gets saved
    techinterval: 10000,                //variable gets saved
    absoluteenergy: 0,                  //variable gets saved
    qd: false,                          //variable gets saved
    prog: 0,
    railguntick: 0,                 
    railgunperc: 0,

    getMetalPerSecond: function() {
        var metalpersecond = 0;
        for (i = 0; i < metalbuilding.name.length; i++) {
            metalpersecond += Math.round(metalbuilding.income[i] * metalbuilding.count[i] * 100) / 100;
        }
        return metalpersecond;

    },
    getProgress: function(){
        game.prog = format(((Math.log10(game.totalmetalmined))/(Math.log10(100000000000000000000000000)))*10000)/100
    },



    
};
function format(amount) {
    let power = Math.floor(Math.log10(amount))
    let mantissa = amount / Math.pow(10, power)
    if (power < 6) return amount.toFixed(0)
    return mantissa.toFixed(2) + "e" + power
}


function tab(tab) {
    document.getElementById("miningMenu").style.display ="none"
    document.getElementById("researchMenu").style.display ="none"
    document.getElementById("energyMenu").style.display ="none"
    document.getElementById("changelogMenu").style.display ="none"
    document.getElementById("aboutMenu").style.display ="none"
    document.getElementById(tab).style.display = "block"
}
tab("miningMenu")


setInterval (function() {
    var ch =Math.random();
    if (ch <= 0.01){
        if(upgrade.purchased[47] == true){
            game.metal += 500 * metalbuilding.income[0]
            document.getElementById("miningtab").classList.add("ding");
        }
    }
}, 1000);

setInterval (function() {
    if (constructorbuilding.count[0] >= 1) {
        game.railguntick += 1000
    }
    if (game.railguntick >= game.railguninterval) {
        game.railguntick = 0,
        energybuilding.count[4] += constructorbuilding.count[0]
        metalbuilding.count[7] += researchbuildingt2.totalincome[0]
        constructorbuilding.count[0] += researchbuildingt2.totalincome[2]
        for (i = 0; i < energybuilding.name.length; i++) {
            energybuilding.absoluteincome[i] = energybuilding.income[i] * (energybuilding.count[i]);
        }
        game.absoluteenergy = energybuilding.absoluteincome[0]+energybuilding.absoluteincome[1]+energybuilding.absoluteincome[2]+energybuilding.absoluteincome[3]+energybuilding.absoluteincome[4]
        game.energy = game.absoluteenergy - (researchbuilding.addedenergycost[0] + researchbuilding.addedenergycost[1] + researchbuilding.addedenergycost[2])
        energybuilding.partoftotal[0] = (energybuilding.absoluteincome[0]) / game.absoluteenergy
        energybuilding.partoftotal[1] = (energybuilding.absoluteincome[1]) / game.absoluteenergy
        energybuilding.partoftotal[2] = (energybuilding.absoluteincome[2]) / game.absoluteenergy
        energybuilding.partoftotal[3] = (energybuilding.absoluteincome[3]) / game.absoluteenergy
        energybuilding.partoftotal[4] = (energybuilding.absoluteincome[4]) / game.absoluteenergy
        document.getElementById("energytab").classList.add("ding");
        display.updateEnergy();
        display.updateMetal();
        display.updateGenerators();
        display.updateResearch();
        display.updateUpgrades();
        display.updateResearchding();
    }
    game.railgunperc = (game.railguntick / game.railguninterval)*100

}, 1000);









setTimeout(function doSomething() {
    var d=Math.random();
    if (researchbuilding.count[0] >= 1){
        if (d <= (0.1 + (researchbuilding.totalincome[1]/100))) {
            game.techpoints += researchbuilding.totalincome[0];
            document.getElementById("reseachtab").classList.add("ding");
        }
        display.updateEnergy();
        display.updateMetal();
        display.updateGenerators();
        display.updateResearch();
        display.updateUpgrades();
        display.updateResearchding();
    }
        setTimeout(doSomething, game.techinterval);
}, game.techinterval);

var metalbuilding = {
    name: [
        "Shovel",
        "Tricone Drill",
        "Bobcat",
        "Caterpillar 6090",
        "Moon Drill",
        "Asteroid Collector",
        "Ion Drill",
        "Planetary extractor"
    ],
    count: [                    //variable gets saved
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    income: [                   //variable gets saved
        1,
        4,
        45,
        400,
        6000,
        45000,
        800000,
        10000000
    ],
    specialbonus: [
        1,
        4,
        25,
        150,
        750,
        2250,
        25000,
        150000
    ],
    cost: [                     //variable gets saved
        10,
        250,
        4200,
        48000,
        550000,
        26000000,
        380000000,
        9000000000
    ],
    totalincome: [                  //variable gets saved
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    partoftotal: [                  //variable gets saved
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],


    purchase: function(index) {
        if (game.metal >= this.cost[index]) {
                game.metal -= this.cost[index];
                this.count[index] += 1;
                this.cost[index] = Math.ceil(this.cost[index] * 1.2);
                game.metalpersecondtwo = game.getMetalPerSecond();
                for (i = 0; i < metalbuilding.name.length; i++) {
                    metalbuilding.totalincome[i] = metalbuilding.income[i] * (metalbuilding.count[i]);
                    metalbuilding.partoftotal[i] = metalbuilding.totalincome[i] / (game.metalpersecondtwo)
                }
                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();

            }

        }
    };

    var researchbuilding = {
        name: [
            "Lab",
            "Supercomputer",
            "Quantum Computer"

        ],
        count: [                    //variable gets saved
            0,
            0,
            0
        ],
        increase:[                  //variable gets saved
            1,
            2,
            0.98
        ],
        metalcost: [                //variable gets saved
            100,
            100,
            100
        ],
        initialmetalcost: [         //variable gets saved
            100,
            100,
            100
        ],
        initialenergycost: [           //variable gets saved
            10,
            10,
            10
        ],
        energycost: [                   //variable gets saved
            10,
            10,
            10
        ],
        addedenergycost: [              //variable gets saved
            0,
            0,
            0
        ],
        totalincome: [                  //variable gets saved
            0,
            0,
            10
        ],
        maxbuy: [
            1000,
            35,
            1000
        ],
            
        purchase: function(index) {
            if (game.metal >= this.metalcost[index] && game.energy >= this.energycost[index] && this.count[index] <= this.maxbuy[index]) {
    
                    game.metal -= this.metalcost[index];
                    this.addedenergycost[index] += this.energycost[index];
                    this.count[index] += 1;
                    this.metalcost[index] = Math.round(this.initialmetalcost[index] * Math.pow(2 ,this.count[index]));
                    this.energycost[index] = Math.round(this.initialenergycost[index] * Math.pow(1.4 ,this.count[index]));    
                    for (i = 0; i < energybuilding.name.length; i++) {
                        energybuilding.absoluteincome[i] = energybuilding.income[i] * (energybuilding.count[i]);
                    }
                    if (researchbuilding.count[2] >= 1) {
                        game.qd= true;
                    }
                    game.absoluteenergy = energybuilding.absoluteincome[0]+energybuilding.absoluteincome[1]+energybuilding.absoluteincome[2]+energybuilding.absoluteincome[3]+energybuilding.absoluteincome[4]
                    game.energy = game.absoluteenergy - (researchbuilding.addedenergycost[0] + researchbuilding.addedenergycost[1] + researchbuilding.addedenergycost[2])                
                    for (i = 0; i < researchbuilding.name.length; i++) {
                        researchbuilding.totalincome[0] = (researchbuilding.increase[0]) * (researchbuilding.count[0]);
                        researchbuilding.totalincome[1] = (researchbuilding.increase[1] * researchbuilding.count[1]);
                        researchbuilding.totalincome[2] = Math.round(10*Math.pow(researchbuilding.increase[2], researchbuilding.count[2])*1000)/1000
                    }
                    game.techinterval = 1000 * researchbuilding.totalincome[2];
    
                    display.updateEnergy();
                    display.updateMetal();
                    display.updateGenerators();
                    display.updateResearch();
                    display.updateUpgrades();
                    display.updateResearchding();
    
                }
    
            },
    
        sell: function(index) {
            if (this.count[index] >= 1) {
            this.addedenergycost[index] -= (this.energycost[index]/1.4);
            this.count[index] = this.count[index] - 1;
            this.metalcost[index] = Math.round(this.initialmetalcost[index] * Math.pow(2 ,this.count[index]));
            this.energycost[index] = Math.round(this.initialenergycost[index] * Math.pow(1.4 ,this.count[index]));
            
            for (i = 0; i < energybuilding.name.length; i++) {
                energybuilding.absoluteincome[i] = energybuilding.income[i] * (energybuilding.count[i]);
            }
            game.absoluteenergy = energybuilding.absoluteincome[0]+energybuilding.absoluteincome[1]+energybuilding.absoluteincome[2]+energybuilding.absoluteincome[3]+energybuilding.absoluteincome[4]
            game.energy = game.absoluteenergy - (researchbuilding.addedenergycost[0] + researchbuilding.addedenergycost[1] + researchbuilding.addedenergycost[2])
            for (i = 0; i < researchbuilding.name.length; i++) {
                researchbuilding.totalincome[0] = (researchbuilding.increase[0]) * (researchbuilding.count[0]);
                researchbuilding.totalincome[1] = (researchbuilding.increase[1] * researchbuilding.count[1]);
                researchbuilding.totalincome[2] = Math.round(10*Math.pow(researchbuilding.increase[2], researchbuilding.count[2])*1000)/1000
            }
            game.techinterval = 1000 * researchbuilding.totalincome[2];
            display.updateEnergy();
            display.updateMetal();
            display.updateGenerators();
            display.updateResearch();
            display.updateUpgrades();
            display.updateResearchding();
        }
    
    
        }
    };
    
var researchbuildingt2 = {
    name: [
        "ACC: Planetary Extractor",
        "Temporal science academy",
        "ACC: Railgun Launcher"
    ],
    description: [
        "ACC PLACEHOLDER",
        "TSA PLACEHOLDER",
        "AAC PLACEHOLDER"
    ],
    type: [
        "ACC",
        "TSA",
        "ACC"
    ],
    count: [        //variable gets saved
        0,
        0,
        0
    ],
    income: [           //variable gets saved
        1,
        0.9,
        1
    ],
    metalcost: [        //variable gets saved
        100000000000,
        0,
        100000000000
    ],
    techcost: [     //variable gets saved
        0,
        1000,
        0
    ],
    energycost: [           //variable gets saved
        1500,
        0,
        1500
    ],
    totalincome: [          //variable gets saved
        0,
        0,
        0
    ],
    purchase: function(index) {
        if (this.type[index] == "ACC" && game.energy >= this.energycost[index] && game.metal >= this.metalcost[index]) {
                game.energy -= this.energycost[index];
                game.metal -= this.metalcost[index];
                this.count[index] += 1;
                this.metalcost[index] = Math.ceil(this.metalcost[index] * 1.2);
                researchbuildingt2.totalincome[0] = researchbuildingt2.income[0] * (researchbuildingt2.count[0]);
                researchbuildingt2.totalincome[2] = researchbuildingt2.income[2] * (researchbuildingt2.count[2]);


                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();

            }
            if (this.type[index] == "TSA" && game.techpoints >= this.techcost[index]) {
                game.techpoints -= this.techcost[index];
                this.count[index] += 1;
                this.techcost[index] = Math.ceil(this.techcost[index] * 1.2);
                this.totalincome[1] = Math.pow(this.income[1] ,this.count[1]); 
                game.railguninterval = game.railgunstartinterval * researchbuildingt2.totalincome[1];

                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();
            }
        }



}
    
    
    
    
var energybuilding = {
    name: [
        "Solar Panel",
        "Hydropower plant",
        "Geothermal power plant",
        "Nuclear power plant",
        "Solar sail"
    ],
    count: [                        //variable gets saved
        0,
        0,
        0,
        0,
        0
    ],
    income: [                       //variable gets saved
        2,
        8,
        40,
        300,
        1500
    ],
    cost: [                         //variable gets saved
        25,
        2500,
        100000,
        3500000,
        680000000
    ],
    totalincome: [                  //variable gets saved
        0,
        0,
        0,
        0,
        0
    ],
    absoluteincome: [               //variable gets saved
        0,
        0,
        0,
        0,
        0
    ],
    partoftotal: [                  //variable gets saved
        0,
        0,
        0,
        0,
        0
    ],
    purchase: function(index) {
        if (game.metal >= this.cost[index]) {
                game.metal -= this.cost[index];
                this.count[index] += 1;
                this.cost[index] = Math.ceil(this.cost[index] * 1.2);
                
                for (i = 0; i < energybuilding.name.length; i++) {
                    energybuilding.absoluteincome[i] = energybuilding.income[i] * (energybuilding.count[i]);
                }
                game.absoluteenergy = energybuilding.absoluteincome[0]+energybuilding.absoluteincome[1]+energybuilding.absoluteincome[2]+energybuilding.absoluteincome[3]+energybuilding.absoluteincome[4]
                game.energy = game.absoluteenergy - (researchbuilding.addedenergycost[0] + researchbuilding.addedenergycost[1] + researchbuilding.addedenergycost[2])
                if (game.absoluteenergy != 0){
                energybuilding.partoftotal[0] = (energybuilding.absoluteincome[0]) / game.absoluteenergy
                energybuilding.partoftotal[1] = (energybuilding.absoluteincome[1]) / game.absoluteenergy
                energybuilding.partoftotal[2] = (energybuilding.absoluteincome[2]) / game.absoluteenergy
                energybuilding.partoftotal[3] = (energybuilding.absoluteincome[3]) / game.absoluteenergy
                energybuilding.partoftotal[4] = (energybuilding.absoluteincome[4]) / game.absoluteenergy
                } 
                
                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();

            }
        }
    };

    var constructorbuilding = {
        name: [
            "Railgun launcher"
        ],

        count: [                        
            0           //variable gets saved
        ],
        income: [                      
            0
        ],
        cost: [                        
            1000000000      //variable gets saved
        ],
        purchase: function(index) {
            if (game.metal >= this.cost[index]) {
                        game.metal -= this.cost[index];
                        this.count[index] += 1;
                        this.cost[index] = Math.ceil(this.cost[index] * 1.1);
                        
                        display.updateEnergy();
                        display.updateMetal();
                        display.updateGenerators();
                        display.updateResearch();
                        display.updateUpgrades();
                        display.updateResearchding();
        
                    }
                } 
               
        };



















var upgrade = {
    name: [
        "Bronze Shovel",
        "Bronze Drills",
        "Bronze Bobcats",
        "Bronze Caterpillar 8090s",
        "Bronze Moon Drills",
        "Bronze Asteroid Collectors",
        "Bronze Ion Drills",
        "Bronze Planetary extractors",
        "Silver Shovel",			
        "Silver Drills",			
        "Silver Bobcats",			//[10]
        "Silver Caterpillar 8090s",
        "Silver Moon Drills",
        "Silver Asteroid Collectors",
        "Silver Ion Drills",
        "Silver Planetary extractors",
        "Golden Shovel",
        "Golden Drills",
        "Golden Bobcats",			
        "Golden Caterpillar 8090s",
        "Golden Moon Drills",			//[20]
        "Golden Asteroid Collectors",
        "Golden Ion Drills",
        "Golden Planetary extractors",
        "Senior Research Scientists",
        "Nobel prize winner",
        "RBG lights",
        "A exaFLOPS Supercomputer",
        "Error free quantum computing",
        "Quantum",
        "Dual-sided Solar Panel",			//[30]
        "Renewable energy contract",
        "Offshore solar array",
        "Increased water flow",
        "Bigger turbines",
        "Heavy water",
        "The good kind of radiation",
        "Fusion reactors",
        "Cold fusion reactors",
        "Mirror polish",
        "Solar sail size swell",			//[40]
        "Concentrated solar collection stations",
        "Improved heat transfer",
        "Dwarves digging holes",
        "Lava is hot too",
        "Tricone Drills on the moon",
        "Your first discovery!",
        "Digging for gold!",					//[47]
        "iujnpbaveriyerb",
        "One Caterpillar 6090, or 6090 caterpillars?",
        "Death Melon!",
        "Rare-earth metals",
        "Solar sail massproduction",
        "Type 2 civilization",
        "AI research",
        "The singularity",
        "Automated Construction Complex blueprints",
        "Next stage soon™"



    ],
    description: [
        "Shovels are twice as efficient.",
        "Tricone drills are twice as efficient.",
        "Bobcats are twice as efficient.",
        "Caterpillar 6090s are twice as efficient.",
        "Moon Drills are twice as efficient.",
        "Asteroid Collectors are twice as efficient.",
        "Ion Drills are twice as efficient.",
        "Planetary extractors are twice as efficient.",
        "Shovels are twice as efficient.",
        "Tricone drills are twice as efficient.",
        "Bobcats are twice as efficient.",			//[10]
        "Caterpillar 6090s are twice as efficient.",
        "Moon Drills are twice as efficient.",
        "Asteroid Collectors are twice as efficient.",
        "Ion Drills are twice as efficient.",
        "Planetary extractors are twice as efficient.",
        "Shovels are twice as efficient.",
        "Tricone drills are twice as efficient.",
        "Bobcats are twice as efficient.",
        "Caterpillar 6090s are twice as efficient.",
        "Moon Drills are twice as efficient.",			//[20]
        "Asteroid Collectors are twice as efficient.",
        "Ion Drills are twice as efficient.",
        "Planetary extractors are twice as efficient.",
        "Hire Senior Research Scientists to boost the amount of tech points each lab generates per discovery by 4.",
        "Hire a Nobel prize winner to boost the amount of tech points per each lab generates per discovery by 22.",
        "Your Supercomputers are now rocking RBG lights, boosting performance to 2.33%.",
        "Your Supercomputers performance exceeds 1.00 exaFLOPS, boosting performance to 2.5%.",
        "Your Quantum computers now increases its effectiveness to 2.5%.",
        "More quantum in your Quantum computers increase it's quantum throughput to 3.5 quantum %.",
        "Dual-sided Solar panels can absorb diffused and reflected sunlight. Solar panels are twice as efficient.",			//[30]
        "Increased government support for Solar panels have allowed breakthroughs in it's productivity. Solar panels are three times as efficient.",
        "Offshore solar arays floating in the ocean gets rid of the need of landmasses. Solar panels are five times as efficient.",
        "Increased water flow allows you to maximize the generators turbine to gather more energy. Hydropower plants are twice as effecient.",
        "Bigger turbines allows you to utilize all the increased water flow to maximize energy gain. Hydropower plants are three times as efficient.",
        "Heavy water increases the gain for each cubic meter of water in the system, right? Hydropower plants are five times as efficient.",
        "All radiation is good radiation. Nuclear power plants are now 100% more radioactive, and 100% more efficient.",
        "Nuclear reactors are now able to fuse nuclei together to release vast amounts of energy. Nuclear power plants are now three times as efficient.",
        "Cold fusion is no longer just hypothesized and is now a reality. Nuclear power plants are now five times as efficient.",
        "New formula of mirror polish has been invented. Solar sails are now 50% more effective.",
        "An increase in the size of Solar sails allows more collection of energy. Solar sails are 50% more effective.",				//[40]
        "Solar collection stations close to large clusters of Solar sails allow more effective transfer of energy. Solar sails are twice as efficient.",
        "Reduces the loss of heat during transfer. Geothermal power plant is twice as efficient.",
        "Dwarves might have dug too deep, at least it's warm down here. Geothermal power plants are three times as efficient.",
        "Lava is indeed very hot, and this can be used for power! Geothermal power plants are five times as efficient.",
        "Geologists have started mining the moon for rare metals. The income for Tricone Drills is multiplied by 5.",
        "You can buy this as soon as you've made your first discovery! Each Lab now produce 3 more tech point per discovery.",
        "Production of your Geothermal power plant have unraveled gold closer to the surface. Shovels have a chance to increase throughput by 50.000% for one tick.",		//[47]
        "All cats love sleeping on the laptops keyboard, even cats named Bob. Supercomputers get even warmer! Bobcats are five times as efficient.",
        "Who is to say what is better? I am. One Caterpillar 6090 vastly outperforms 6090 caterpillars. Now that you know this, the Caterpillar 6090 are five times as efficient.",
        "That's no moon, thats a melon, THE DEATH MEL... oh, no wait, it's actually just the moon. Moon Drill operators are amused by the old referense and are now twice as efficient.",
        "Quantum computers require vast amounts of rare-earth metals that can be found in Asteroids. Legally, Asteroid collectors must therefore become three times as efficient.",
        "The production of solar sails can be automated at a great cost of energy, luckily the production is exponential. Allows the construction of Railgun launchers.",
        "Skipping over becoming a type 1 civilization, we jump straight into being a type 2 civilization able to harness the power of the sun. Boosts metalproduction by 1% per unused Energy/s.",
        "AI has the potential to transcends human intelligence. AI research boost technological discoveries by 100 Tech points per discovery.",
        "Artifical intelligence lives among us, most humans are connected through implants that allow us to co-exist without an AI uprising... yet. The Singularity boost technological discoveries by 666.666 Tech points per discovery.",
        "The same automation that makes Railgun launchers able to construct and deliver Solar sails in orbit, can be used to automate the construction of Planetary extractors or Railgun launchers.",
        "Interstellar space travel is still far from our reach, but now that you've started exploring the solar system, some visualization of when the next stage of your civilization will begin has become available."
    ],
    type: [
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",		//[10]
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",		//[20]
        "metalbuilding",
        "metalbuilding",
        "metalbuilding",
        "researchbuilding",
        "researchbuilding",
        "researchbuilding",
        "researchbuilding",
        "researchbuilding",
        "researchbuilding",
        "energybuilding",		//[30]
        "energybuilding",
        "energybuilding",
        "energybuilding",
        "energybuilding",
        "energybuilding",
        "energybuilding",
        "energybuilding",
        "energybuilding",
        "energybuilding",
        "energybuilding",		//[40]
        "energybuilding",
        "energybuilding",
        "energybuilding",
        "energybuilding",
        "triconeupgrade",
        "researchbuilding",
        "Findinggold",			//[47]
        "bobcatbuilding",
        "metalbuilding",
        "metalbuilding",        //50
        "asteroidbuilding",
        "railgunlauncher",
        "civilization",
        "aiupgrade",
        "researchbuilding",
        "railgunreq",
        "truebuilding"          //57
    ],
    cost: [
        15,         //br shovel
        30,         //br drills
        200,        //br bobcats
        250,        //br caterpillar
        800,        //br moon drills
        2500,       //br asteroid
        10000,       //br ion drill 
        150000,      //br planet
        125,                //S shovel
        200,                //S drill
        275,		//[10]  //S bobcat
        350,               //S caterpillar
        1000,               //S moondrill
        1600,               //S asteroid
        3000,               //S ion drill
        5000,               //S planet
        450,                //G shovel
        2000,                //G drill
        800,                //G bobcat
        1250,               //G caterpillar
        10000,		//[20]  //G moondrill
        5500000,            //G asteroid
        25000000,           //G ion drill
        50000000,          //G planet
        1500,
        15000,
        300,
        30000,
        400,
        20000,
        25,			//[30]
        100,
        2000,
        50,
        400,
        3500,
        1200,
        5000,
        40000,
        800,
        25000,		//[40]
        100000,
        600,
        5000,
        30000,
        300,
        1,
        200,				//[47]
        125,
        250,
        300,
        600,
        60000,
        100000,
        100000,
        10000000,
        100000,
        1000

    ],
    metalbuildingIndex: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        0,
        1,
        2,			//[10]
        3,
        4,
        5,
        6,
        7,
        0,
        1,
        2,
        3,
        4,			//[20]
        5,
        6,
        7,
        0,
        0,
        0,
        0,
        0,
        0,
        0,			//[30]
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,			//[40]
        0,
        0,
        0,
        0,
        4,
        0,
        0,			//[47]
        2,
        3,
        1,
        5,
        7,
        0,
        0,
        0,
        0,
        5

    ],
    researchbuildingIndex: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        0,
        1,
        2,			//[10]
        3,
        4,
        5,
        6,
        7,
        0,
        1,
        2,
        3,
        4,			//[20]
        5,
        6,
        7,
        0,
        0,
        1,
        1,
        2,
        2,
        0,			//[30]
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,			//[40]
        0,
        0,
        0,
        0,
        0,
        0,
        0,			//[47]
        1,
        0,
        0,
        2,
        0,
        0,
        1,
        0,
        0,
        0
    
    ],
    energybuildingIndex: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        0,
        1,
        2,			//[10]
        3,
        4,
        5,
        6,
        7,
        0,
        1,
        2,
        3,
        4,			//[20]
        5,
        6,
        7,
        0,
        0,
        1,
        1,
        2,
        2,
        0,			//[30]
        0,
        0,
        1,
        1,
        1,
        3,
        3,
        3,
        4,
        4,			//[40]
        4,
        2,
        2,
        2,
        0,
        0,
        2,			//[47]
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    
    ],
    requirement: [
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        25,
        25,
        25,		//[10]
        25,
        25,
        25,
        25,
        25,
        50,
        50,
        50,
        50,
        50,		//[20]
        50,
        50,
        50,
        10,
        20,
        5,
        20,
        5,
        20,
        10,		//[30]
        25,
        50,
        10,
        25,
        50,
        10,
        25,
        50,
        10,
        25,		//[40]
        50,
        10,
        25,
        50,
        1,
        1,
        1,		//[47]
        5,
        6,
        30,
        10,
        1,
        0,
        36,
        50,
        1,
        1
    ],
    bonus: [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,		//[10]
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,		//[20]
        2,
        2,
        2,
        4,
        25,
        0.33,
        0.17,
        -0.005,
        -0.01,
        2,		//[30]
        3,
        5,
        2,
        3,
        5,
        2,
        3,
        5,
        1.5,
        1.5,		//[40]
        2,
        2,
        3,
        5,
        5,
        3,
        500,			//[47]
        5,
        5,
        2,
        3,
        0,
        0,
        100,
        667,
        0,
        0
    ],

    purchased: [false],             //variable gets saved

    purchase: function(index) {
        if(!this.purchased[index] && game.techpoints >= this.cost[index]) {

            if (this.type[index] == "aiupgrade" && researchbuilding.count[this.researchbuildingIndex[index]] >= this.requirement[index]) {
                researchbuilding.increase[0] += this.bonus[index];
                game.techpoints -= this.cost[index];
                this.purchased[index] = true;
                for (i = 0; i < researchbuilding.name.length; i++) {
                    researchbuilding.totalincome[0] = (researchbuilding.increase[0]) * (researchbuilding.count[0]);
                    researchbuilding.totalincome[1] = (researchbuilding.increase[1] * researchbuilding.count[1]);
                    researchbuilding.totalincome[2] = Math.round(10*Math.pow(researchbuilding.increase[2], researchbuilding.count[2])*100)/100
                }
                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();

            } 
            if (this.type[index] == "railgunreq" && constructorbuilding.count[0] >= this.requirement[index]) {
                game.techpoints -= this.cost[index];
                this.purchased[index] = true;
                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();
            
            }
            if (this.type[index] == "truebuilding" && metalbuilding.count[this.metalbuildingIndex[index]] >= this.requirement[index]) {
                game.techpoints -= this.cost[index];
                this.purchased[index] = true;
                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();
            
            }

            if (this.type[index] == "civilization" && energybuilding.count[this.energybuildingIndex[index]] >= this.requirement[index]) {
                game.techpoints -= this.cost[index];
                this.purchased[index] = true;
                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();
            
            }

            if (this.type[index] == "Findinggold" && energybuilding.count[this.energybuildingIndex[index]] >= this.requirement[index]) {
                game.techpoints -= this.cost[index];
                this.purchased[index] = true;
                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();
            
            }

            if (this.type[index] == "railgunlauncher" && metalbuilding.count[this.metalbuildingIndex[index]] >= this.requirement[index]) {
                game.techpoints -= this.cost[index];
                this.purchased[index] = true;
                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();
            
            }

            if (this.type[index] == "asteroidbuilding" && researchbuilding.count[this.researchbuildingIndex[index]] >= this.requirement[index]) {
                game.techpoints -= this.cost[index];
                this.purchased[index] = true;
                metalbuilding.income[5] *= this.bonus[index];
                game.metalpersecondtwo = game.getMetalPerSecond();
                for (i = 0; i < metalbuilding.name.length; i++) {
                    metalbuilding.totalincome[i] = metalbuilding.income[i] * (metalbuilding.count[i]);
                    metalbuilding.partoftotal[i] = metalbuilding.totalincome[i] / (game.metalpersecondtwo)
                }
                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();

            }
            if (this.type[index] == "triconeupgrade" && metalbuilding.count[this.metalbuildingIndex[index]] >= this.requirement[index]) {
                game.techpoints -= this.cost[index];
                this.purchased[index] = true;
                metalbuilding.income[1] *= this.bonus[index];
                game.metalpersecondtwo = game.getMetalPerSecond();
                for (i = 0; i < metalbuilding.name.length; i++) {
                    metalbuilding.totalincome[i] = metalbuilding.income[i] * (metalbuilding.count[i]);
                    metalbuilding.partoftotal[i] = metalbuilding.totalincome[i] / (game.metalpersecondtwo)
                }
                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();

            }
            if (this.type[index] == "bobcatbuilding" && researchbuilding.count[this.researchbuildingIndex[index]] >= this.requirement[index]) {
                game.techpoints -= this.cost[index];
                metalbuilding.income[this.metalbuildingIndex[index]] *= this.bonus[index];
                this.purchased[index] = true;
                game.metalpersecondtwo = game.getMetalPerSecond();
                for (i = 0; i < metalbuilding.name.length; i++) {
                    metalbuilding.totalincome[i] = metalbuilding.income[i] * (metalbuilding.count[i]); 
                    metalbuilding.partoftotal[i] = metalbuilding.totalincome[i] / (game.metalpersecondtwo)
                             
                }
                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();

                

            }
            if (this.type[index] == "metalbuilding" && metalbuilding.count[this.metalbuildingIndex[index]] >= this.requirement[index]) {
                game.techpoints -= this.cost[index];
                metalbuilding.income[this.metalbuildingIndex[index]] *= this.bonus[index];
                this.purchased[index] = true;
                game.metalpersecondtwo = game.getMetalPerSecond();
                for (i = 0; i < metalbuilding.name.length; i++) {
                    metalbuilding.totalincome[i] = metalbuilding.income[i] * (metalbuilding.count[i]); 
                    metalbuilding.partoftotal[i] = metalbuilding.totalincome[i] / (game.metalpersecondtwo)
                             
                }
                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();

                

            }  
            if (this.type[index] == "researchbuilding" && researchbuilding.count[this.researchbuildingIndex[index]] >= this.requirement[index]) {
                researchbuilding.increase[this.researchbuildingIndex[index]] += this.bonus[index];
                game.techpoints -= this.cost[index];
                this.purchased[index] = true;
                for (i = 0; i < researchbuilding.name.length; i++) {
                    researchbuilding.totalincome[0] = (researchbuilding.increase[0]) * (researchbuilding.count[0]);
                    researchbuilding.totalincome[1] = (researchbuilding.increase[1] * researchbuilding.count[1]);
                    researchbuilding.totalincome[2] = Math.round(10*Math.pow(researchbuilding.increase[2], researchbuilding.count[2])*100)/100
                }
                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();

            } 
            if (this.type[index] == "energybuilding" && energybuilding.count[this.energybuildingIndex[index]] >= this.requirement[index]) {
                game.energy -= energybuilding.absoluteincome[this.energybuildingIndex[index]];
                energybuilding.income[this.energybuildingIndex[index]] *= this.bonus[index];
                game.techpoints -= this.cost[index];
                this.purchased[index] = true;
                
                for (i = 0; i < energybuilding.name.length; i++) {
                    energybuilding.absoluteincome[i] = energybuilding.income[i] * (energybuilding.count[i]);
                    energybuilding.totalincome[i] = energybuilding.income[i] * (energybuilding.count[i]);
                }
                game.energy += energybuilding.absoluteincome[this.energybuildingIndex[index]];
                energybuilding.partoftotal[0] = (energybuilding.absoluteincome[0]) / (energybuilding.absoluteincome[0]+energybuilding.absoluteincome[1]+energybuilding.absoluteincome[2]+energybuilding.absoluteincome[3])
                energybuilding.partoftotal[1] = (energybuilding.absoluteincome[1]) / (energybuilding.absoluteincome[0]+energybuilding.absoluteincome[1]+energybuilding.absoluteincome[2]+energybuilding.absoluteincome[3])
                energybuilding.partoftotal[2] = (energybuilding.absoluteincome[2]) / (energybuilding.absoluteincome[0]+energybuilding.absoluteincome[1]+energybuilding.absoluteincome[2]+energybuilding.absoluteincome[3])
                energybuilding.partoftotal[3] = (energybuilding.absoluteincome[3]) / (energybuilding.absoluteincome[0]+energybuilding.absoluteincome[1]+energybuilding.absoluteincome[2]+energybuilding.absoluteincome[3])
                display.updateEnergy();
                display.updateMetal();
                display.updateGenerators();
                display.updateResearch();
                display.updateUpgrades();
                display.updateResearchding();

            } 

            
         
   
        }             
              

    }               
};







var display = {



    updateMetal: function() {
        document.getElementById("metalproductionboost").innerHTML = "";
        document.getElementById("gameover").innerHTML = "";
        document.getElementById("metal").innerHTML = format(Math.round(game.metal * 100) / 100);
        document.getElementById("metalproduction").innerHTML = "";
        document.getElementById("progressperc").innerHTML = format(game.prog*100)/100;
        document.getElementById("railbarperc").innerHTML = 'Automated construction progress: '+format(game.railgunperc*100)/100+'%';
        document.title = "NaNNaNNaNNaN Batman";
        document.getElementById("techtime").innerHTML = Math.round(researchbuilding.totalincome[2]*100) /100;
        document.getElementById("techpercent").innerHTML = format(10+researchbuilding.totalincome[1]);
        document.getElementById("techamount").innerHTML = researchbuilding.totalincome[0];
        updateValue(game.prog);
        updateValues(game.railgunperc);
        if (constructorbuilding.count[0] >= 1) {
            document.getElementById("railgunBar").classList.remove("hidden")
        }
        if (upgrade.purchased[57] == true) {
            document.getElementById("progressBar").classList.remove("hidden")
        }
        if (upgrade.purchased[53] == true){ 
            document.getElementById("metalproduction").innerHTML = format((game.getMetalPerSecond())*(format(0.01*game.energy)));
        } else document.getElementById("metalproduction").innerHTML = format(game.getMetalPerSecond());

        if (upgrade.purchased[53] == true){ 
            document.getElementById("metalproductionboost").innerHTML += '(<span class="orangetext">'+format(game.getMetalPerSecond())+'</span> boosted by <span class="bluetext">'+format(0.01*game.energy)+'</span>%)';
        }
        if (game.totalmetalmined >= 100000000000000000000000000) {
            document.getElementById("gameover").innerHTML = "GAME OVER THANKS FOR PLAYING, STAY TUNED FOR UPDATES ON DISCORD.GG/TRECKIE, AND FEEL FREE TO DROP SOME FEEDBACK!";
        }
    },

    updateGenerators: function() {

        document.getElementById("metalgenContainer").innerHTML = "";

                for (i = 0; i < metalbuilding.name.length; i++) {

                    if (metalbuilding.name[i] == "Shovel") {
                        if (metalbuilding.cost[0] <= game.metal) 
                        document.getElementById("metalgenContainer").innerHTML += '<div class="metalgenContainer tooltip canafford colums6" onclick="metalbuilding.purchase('+i+')"><p>'+metalbuilding.name[i]+'</p> <p>'+metalbuilding.count[i]+'</p><p>'+format(metalbuilding.income[i])+' Metal/s</p><p>Total '+format(metalbuilding.totalincome[i])+' Metal/s</p><p>Costs: '+format(metalbuilding.cost[i])+' Metal</p><p>'+format(metalbuilding.partoftotal[i]*100)+'% of total</p> <span class="tooltiptext">The next '+metalbuilding.name[i]+' you buy will produce <span class="orangetext">'+format((metalbuilding.income[i]/metalbuilding.cost[i])*10000000)/100+'</span> Metal/s for each <span class="orangetext">100 000</span> Metal spent, and increase total Metal/s production by '+format((metalbuilding.income[i]/(game.metalpersecondtwo))*10000)/100+'%. You have '+metalbuilding.count[i]+' '+metalbuilding.name[i]+'s, each producing <span class="orangetext">'+metalbuilding.income[i]+'</span> Metal/s (for a total of <span class="orangetext">'+metalbuilding.totalincome[i]+'</span> Metal/s)</span></div><br>'
                        else  document.getElementById("metalgenContainer").innerHTML += '<div class="metalgenContainer tooltip cantafford colums6" onclick="metalbuilding.purchase('+i+')"><p>'+metalbuilding.name[i]+'</p> <p>'+metalbuilding.count[i]+'</p><p>'+format(metalbuilding.income[i])+' Metal/s</p><p>Total '+format(metalbuilding.totalincome[i])+' Metal/s</p>   <p>Costs: '+format(metalbuilding.cost[i])+' Metal</p><p>'+format(metalbuilding.partoftotal[i]*100)+'% of total</p><span class="tooltiptext">The next '+metalbuilding.name[i]+' you buy will produce <span class="orangetext">'+format((metalbuilding.income[i]/metalbuilding.cost[i])*10000000)/100+'</span> Metal/s for each <span class="orangetext">100 000</span> Metal spent, and increase total Metal/s production by '+format((metalbuilding.income[i]/(game.metalpersecondtwo))*10000)/100+'%. You have '+metalbuilding.count[i]+' '+metalbuilding.name[i]+'s, each producing <span class="orangetext">'+metalbuilding.income[i]+'</span> Metal/s (for a total of <span class="orangetext">'+metalbuilding.totalincome[i]+'</span> Metal/s)</p></span></div><br>'
                    }
                    if (metalbuilding.count[i-1] >= 1 && metalbuilding.name[i] != "Shovel") {
                        if (metalbuilding.cost[i] <= game.metal) 
                        document.getElementById("metalgenContainer").innerHTML += '<div class="metalgenContainer tooltip canafford colums6" onclick="metalbuilding.purchase('+i+')"><p>'+metalbuilding.name[i]+'</p> <p>'+metalbuilding.count[i]+'</p><p>'+format(metalbuilding.income[i])+' Metal/s</p><p>Total '+format(metalbuilding.totalincome[i])+' Metal/s</p><p>Costs: '+format(metalbuilding.cost[i])+' Metal</p><p>'+format(metalbuilding.partoftotal[i]*100)+'% of total</p> <span class="tooltiptext">The next '+metalbuilding.name[i]+' you buy will produce <span class="orangetext">'+format((metalbuilding.income[i]/metalbuilding.cost[i])*10000000)/100+'</span> Metal/s for each <span class="orangetext">100 000</span> Metal spent, and increase total Metal/s production by '+format((metalbuilding.income[i]/(game.metalpersecondtwo))*10000)/100+'%. You have '+metalbuilding.count[i]+' '+metalbuilding.name[i]+'s, each producing <span class="orangetext">'+metalbuilding.income[i]+'</span> Metal/s (for a total of <span class="orangetext">'+metalbuilding.totalincome[i]+'</span> Metal/s)</span></div><br>'
                        else  document.getElementById("metalgenContainer").innerHTML += '<div class="metalgenContainer tooltip cantafford colums6" onclick="metalbuilding.purchase('+i+')"><p>'+metalbuilding.name[i]+'</p> <p>'+metalbuilding.count[i]+'</p><p>'+format(metalbuilding.income[i])+' Metal/s</p><p>Total '+format(metalbuilding.totalincome[i])+' Metal/s</p>   <p>Costs: '+format(metalbuilding.cost[i])+' Metal</p><p>'+format(metalbuilding.partoftotal[i]*100)+'% of total</p><span class="tooltiptext">The next '+metalbuilding.name[i]+' you buy will produce <span class="orangetext">'+format((metalbuilding.income[i]/metalbuilding.cost[i])*10000000)/100+'</span> Metal/s for each <span class="orangetext">100 000</span> Metal spent, and increase total Metal/s production by '+format((metalbuilding.income[i]/(game.metalpersecondtwo))*10000)/100+'%. You have '+metalbuilding.count[i]+' '+metalbuilding.name[i]+'s, each producing <span class="orangetext">'+metalbuilding.income[i]+'</span> Metal/s (for a total of <span class="orangetext">'+metalbuilding.totalincome[i]+'</span> Metal/s)</p></span></div><br>'
                    }
                }  
               

    },

    updateResearch: function() {
        document.getElementById("researchContainer").innerHTML = "";
        document.getElementById("researcht2Container").innerHTML = "";
        document.getElementById("selling").innerHTML = "";


        document.getElementById("techpoints").innerHTML = game.techpoints;

                    document.getElementById("selllabContainer").innerHTML = '<div class="selllabContainer" onclick="researchbuilding.sell('+0+')")><p> Sell Lab</p>';

        if (researchbuilding.count[1] >= 1 || game.qd==true){
            document.getElementById("sellcompContainer").innerHTML = '<div class="sellcompContainer" onclick="researchbuilding.sell('+1+')")><p> Sell Supercomputer</p>';

        }
        if (researchbuilding.count[2] >= 1 || game.qd==true){
            document.getElementById("sellqcompContainer").innerHTML = '<div class="sellqcompContainer" onclick="researchbuilding.sell('+2+')")><p> Sell Quantum Computer</p>';
        }
        if (researchbuilding.metalcost[0] <= game.metal && researchbuilding.energycost[0] <= game.energy) 
            document.getElementById("researchContainer").innerHTML += '<div class="researchContainer tooltip canafford colums5" onclick="researchbuilding.purchase('+0+')")><p>'+researchbuilding.name[0]+'</p><p>'+researchbuilding.count[0]+'</p><p> Costs: '+format(researchbuilding.metalcost[0])+' Metal</p><p> Costs: '+format(researchbuilding.energycost[0])+' Energy/s</p> <p>'+researchbuilding.totalincome[0]+' per procc</p><span class="tooltiptext"> Buying a '+researchbuilding.name[0]+' will increase the amount of tech points per discovery by '+researchbuilding.increase[0]+' </span><br>'
        else  document.getElementById("researchContainer").innerHTML += '<div class="researchContainer tooltip cantafford colums5"onclick="researchbuilding.purchase('+0+')")><p> '+researchbuilding.name[0]+'</p><p>'+researchbuilding.count[0]+'</p><p> Costs: '+format(researchbuilding.metalcost[0])+' Metal</p><p> Costs: '+format(researchbuilding.energycost[0])+' Energy/s</p><p>'+researchbuilding.totalincome[0]+'per procc</p><span class="tooltiptext"> Buying a '+researchbuilding.name[0]+' will increase the amount of tech points per discovery by '+researchbuilding.increase[0]+' </span><br>'


        if (researchbuilding.count[0] >= 1 || game.qd==true) {
            document.getElementById("selling").innerHTML = "Selling a research building does not return the metal used to build it.";
            if (researchbuilding.count[1] <= 35){
                if (researchbuilding.metalcost[1] <= game.metal && researchbuilding.energycost[1] <= game.energy && researchbuilding.count[1] <= 35) 
                    document.getElementById("researchContainer").innerHTML += '<div class="researchContainer tooltip canafford colums5" onclick="researchbuilding.purchase('+1+')")><p>'+researchbuilding.name[1]+'</p><p>'+researchbuilding.count[1]+'</p><p> Costs: '+format(researchbuilding.metalcost[1])+' Metal</p><p> Costs: '+format(researchbuilding.energycost[1])+' Energy/s</p> <p>'+format(researchbuilding.totalincome[1])+'% increase</p><span class="tooltiptext"> Buying a '+researchbuilding.name[1]+' will increase the chance of making a discovery by '+researchbuilding.increase[1]+' percentage points </span><br>'
                else  document.getElementById("researchContainer").innerHTML += '<div class="researchContainer tooltip cantafford colums5"onclick="researchbuilding.purchase('+1+')")><p> '+researchbuilding.name[1]+'</p><p>'+researchbuilding.count[1]+'</p><p> Costs: '+format(researchbuilding.metalcost[1])+' Metal</p><p> Costs: '+format(researchbuilding.energycost[1])+' Energy/s</p><p>'+format(researchbuilding.totalincome[1])+'% increase</p><span class="tooltiptext"> Buying a '+researchbuilding.name[1]+' will increase the chance of making a discovery by '+researchbuilding.increase[1]+' percentage points </span><br>'
           } else document.getElementById("researchContainer").innerHTML += '<div class="researchContainer tooltip cantafford colums5"onclick="researchbuilding.purchase('+1+')")><p> '+researchbuilding.name[1]+'</p><p>'+researchbuilding.count[1]+'</p><p> MAXIMUM NUMBER OF BUILDINGS REACHED </p><p>'+format(researchbuilding.totalincome[1])+'% increase</p><span class="tooltiptext"> Buying a '+researchbuilding.name[1]+' will increase the chance of making a discovery by '+researchbuilding.increase[1]+' percentage points </span><br>'
        }
        if (researchbuilding.count[1] >= 1 || game.qd==true) {
            if (researchbuilding.metalcost[2] <= game.metal && researchbuilding.energycost[2] <= game.energy) 
                document.getElementById("researchContainer").innerHTML += '<div class="researchContainer tooltip canafford colums5" onclick="researchbuilding.purchase('+2+')")><p>'+researchbuilding.name[2]+'</p><p>'+researchbuilding.count[2]+'</p><p> Costs: '+format(researchbuilding.metalcost[2])+' Metal</p><p> Costs: '+format(researchbuilding.energycost[2])+' Energy/s</p> <p>Every '+researchbuilding.totalincome[2]+' seconds</p><span class="tooltiptext"> Buying a '+researchbuilding.name[2]+' will decrease the time between each discovery by '+format((1-(researchbuilding.increase[2]))*100)+'% </span><br>'
            else  document.getElementById("researchContainer").innerHTML += '<div class="researchContainer tooltip cantafford colums5"onclick="researchbuilding.purchase('+2+')")><p> '+researchbuilding.name[2]+'</p><p>'+researchbuilding.count[2]+'</p><p> Costs: '+format(researchbuilding.metalcost[2])+' Metal</p><p> Costs: '+format(researchbuilding.energycost[2])+' Energy/s</p><p>Every '+researchbuilding.totalincome[2]+' seconds</p><span class="tooltiptext"> Buying a '+researchbuilding.name[2]+' will decrease the time between each discovery by '+format((1-(researchbuilding.increase[2]))*100)+'% </span><br>'
        }

        if (upgrade.purchased[56] == true) {
            if (researchbuildingt2.metalcost[0] <= game.metal && researchbuildingt2.energycost[0] <= game.energy) 
                document.getElementById("researcht2Container").innerHTML += '<div class="researcht2Container tooltip canafford colums5" onclick="researchbuildingt2.purchase('+0+')")><p>'+researchbuildingt2.name[0]+'</p><p>'+researchbuildingt2.count[0]+'</p><p> Costs: '+format(researchbuildingt2.metalcost[0])+' Metal</p><p> Costs: '+format(researchbuildingt2.energycost[0])+' Energy/s</p> <p>Builds '+researchbuildingt2.totalincome[0]+' Planetary extractors every '+format(((game.railguninterval/60000))*1000)/1000+' Minutes</p><span class="tooltiptext"> Every Automated construction complex will build one Planetary extractor every '+format(((game.railguninterval/60000))*1000)/1000+' Minutes (This can be reduced by building a Temporal Science academy). Automatically created buildings does not increase the cost of manually built buildings.</span><br>'
            else  document.getElementById("researcht2Container").innerHTML += '<div class="researcht2Container tooltip cantafford colums5"onclick="researchbuildingt2.purchase('+0+')")><p> '+researchbuildingt2.name[0]+'</p><p>'+researchbuildingt2.count[0]+'</p><p> Costs: '+format(researchbuildingt2.metalcost[0])+' Metal</p><p> Costs: '+format(researchbuildingt2.energycost[0])+' Energy/s</p><p>Builds '+researchbuildingt2.totalincome[0]+' Planetary extractors every '+format(((game.railguninterval/60000))*1000)/1000+' Minutes</p><span class="tooltiptext"> Every Automated construction complex will build one Planetary extractor every '+format(((game.railguninterval/60000))*1000)/1000+' Minutes (This can be reduced by building a Temporal Science academy). Automatically created buildings does not increase the cost of manually built buildings.</span><br>'
        }
        if (upgrade.purchased[56] == true) {
            if (researchbuildingt2.metalcost[2] <= game.metal && researchbuildingt2.energycost[2] <= game.energy) 
                document.getElementById("researcht2Container").innerHTML += '<div class="researcht2Container tooltip canafford colums5" onclick="researchbuildingt2.purchase('+2+')")><p>'+researchbuildingt2.name[2]+'</p><p>'+researchbuildingt2.count[2]+'</p><p> Costs: '+format(researchbuildingt2.metalcost[2])+' Metal</p><p> Costs: '+format(researchbuildingt2.energycost[2])+' Energy/s</p> <p>Builds '+researchbuildingt2.totalincome[2]+' Railgun Launcher every '+format(((game.railguninterval/60000))*1000)/1000+' Minutes</p><span class="tooltiptext"> Every Automated construction complex will build one Railgun Launcher every '+format(((game.railguninterval/60000))*1000)/1000+' Minutes (This can be reduced by building a Temporal Science academy). Automatically created buildings does not increase the cost of manually built buildings.</span><br>'
            else  document.getElementById("researcht2Container").innerHTML += '<div class="researcht2Container tooltip cantafford colums5"onclick="researchbuildingt2.purchase('+2+')")><p> '+researchbuildingt2.name[2]+'</p><p>'+researchbuildingt2.count[2]+'</p><p> Costs: '+format(researchbuildingt2.metalcost[2])+' Metal</p><p> Costs: '+format(researchbuildingt2.energycost[2])+' Energy/s</p><p>Builds '+researchbuildingt2.totalincome[2]+' Railgun Launcher every '+format(((game.railguninterval/60000))*1000)/1000+' Minutes</p><span class="tooltiptext"> Every Automated construction complex will build one Railgun Launcher every '+format(((game.railguninterval/60000))*1000)/1000+' Minutes (This can be reduced by building a Temporal Science academy). Automatically created buildings does not increase the cost of manually built buildings.</span><br>'
        }
        if (researchbuildingt2.count[2] >= 1 || researchbuildingt2.count[0] >= 1) {
            if (researchbuildingt2.techcost[1] <= game.techpoints) 
                document.getElementById("researcht2Container").innerHTML += '<div class="researcht2Container tooltip canafford colums5" onclick="researchbuildingt2.purchase('+1+')")><p>'+researchbuildingt2.name[1]+'</p><p>'+researchbuildingt2.count[1]+'</p><p> Costs: '+format(researchbuildingt2.techcost[1])+' Tech points</p><p>Time between each completion: '+format(((game.railguninterval/60000))*1000)/1000+' Minutes</p><span class="tooltiptext">Buying a '+researchbuildingt2.name[1]+' will decrease the time between for Automated construction complexes to finish building a Planetary extractor by 10%</span><br>'
            else  document.getElementById("researcht2Container").innerHTML += '<div class="researcht2Container tooltip cantafford colums5"onclick="researchbuildingt2.purchase('+1+')")><p> '+researchbuildingt2.name[1]+'</p><p>'+researchbuildingt2.count[1]+'</p><p> Costs: '+format(researchbuildingt2.techcost[1])+' Tech points</p><p>Time between each completion: '+format(((game.railguninterval/60000))*1000)/1000+' Minutes</p><span class="tooltiptext">Buying a '+researchbuildingt2.name[1]+' will decrease the time between for Automated construction complexes to finish building a Planetary extractor by 10%</span><br>'
        }


    },







    updateEnergy: function() {

        document.getElementById("energyproduction").innerHTML = format(game.energy);
        document.getElementById("energyproductiontwo").innerHTML = format(game.absoluteenergy);
        document.getElementById("energysurplus").innerHTML = format(game.energy);
        document.getElementById("energyusage").innerHTML = format(game.absoluteenergy - game.energy);



        document.getElementById("energyContainer").innerHTML = "";
        for (i = 0; i < energybuilding.name.length; i++) {
            if (energybuilding.name[i] == "Solar Panel") {
                if (energybuilding.cost[i] <= game.metal) 
                document.getElementById("energyContainer").innerHTML += '<div class="energyContainer tooltip canafford colums6" onclick="energybuilding.purchase('+i+')"><p>'+energybuilding.name[i]+'</p> <p>'+format(energybuilding.count[i])+'</p><p>'+format(energybuilding.income[i]*10)/10+' Energy/s</p><p>Total '+format(energybuilding.absoluteincome[i])+' Energy/s</p><p>Costs: '+format(energybuilding.cost[i])+' Metal</p><p>'+format(energybuilding.partoftotal[i]*100)+'% of total</p> <span class="tooltiptext"> The next '+energybuilding.name[i]+' will produce <span class="bluetext">'+format(format(energybuilding.income[i])/format(energybuilding.cost[i])*10000000)/100+'</span> Energy per <span class="orangetext">100.000</span> Metal spent on building it. You have '+energybuilding.count[i]+' '+energybuilding.name[i]+'s, each producing <span class="bluetext">'+energybuilding.income[i]+'</span> Energy/s (for a total of <span class="bluetext">'+energybuilding.totalincome[i]+'</span> Energy/s)</span></div><br>'
                else  document.getElementById("energyContainer").innerHTML += '<div class="energyContainer tooltip cantafford colums6" onclick="energybuilding.purchase('+i+')"><p>'+energybuilding.name[i]+'</p> <p>'+format(energybuilding.count[i])+'</p><p>'+format(energybuilding.income[i]*10)/10+' Energy/s</p><p>Total '+format(energybuilding.absoluteincome[i])+' Energy/s</p>   <p>Costs: '+format(energybuilding.cost[i])+' Metal</p><p>'+format(energybuilding.partoftotal[i]*100)+'% of total</p><span class="tooltiptext"> The next '+energybuilding.name[i]+' will produce <span class="bluetext">'+format(format(energybuilding.income[i])/format(energybuilding.cost[i])*10000000)/100+'</span> Energy <span class="orangetext">100.000</span> per Metal spent on building it. You have '+energybuilding.count[i]+' '+energybuilding.name[i]+'s, each producing <span class="bluetext">'+energybuilding.income[i]+'</span> Energy/s (for a total of <span class="bluetext">'+energybuilding.totalincome[i]+'</span> Energy/s)</span></div><br>'
            }
            if (energybuilding.count[i-1] >= 1 && energybuilding.name[i] != "Solar Panel") {
                if (energybuilding.cost[i] <= game.metal) 
                document.getElementById("energyContainer").innerHTML += '<div class="energyContainer tooltip canafford colums6" onclick="energybuilding.purchase('+i+')"><p>'+energybuilding.name[i]+'</p> <p>'+energybuilding.count[i]+'</p><p>'+format(energybuilding.income[i]*10)/10+' Energy/s</p><p>Total '+format(energybuilding.absoluteincome[i])+' Energy/s</p><p>Costs: '+format(energybuilding.cost[i])+' Metal</p><p>'+format(energybuilding.partoftotal[i]*100)+'% of total</p> <span class="tooltiptext"> The next '+energybuilding.name[i]+' will produce <span class="bluetext">'+format(format(energybuilding.income[i])/format(energybuilding.cost[i])*10000000)/100+'</span> Energy per <span class="orangetext">100.000</span> Metal spent on building it. You have '+energybuilding.count[i]+' '+energybuilding.name[i]+'s, each producing <span class="bluetext">'+energybuilding.income[i]+'</span> Energy/s (for a total of <span class="bluetext">'+energybuilding.totalincome[i]+'</span> Energy/s)</span></div><br>'
                else  document.getElementById("energyContainer").innerHTML += '<div class="energyContainer tooltip cantafford colums6" onclick="energybuilding.purchase('+i+')"><p>'+energybuilding.name[i]+'</p> <p>'+energybuilding.count[i]+'</p><p>'+format(energybuilding.income[i]*10)/10+' Energy/s</p><p>Total '+format(energybuilding.absoluteincome[i])+' Energy/s</p>   <p>Costs: '+format(energybuilding.cost[i])+' Metal</p><p>'+format(energybuilding.partoftotal[i]*100)+'% of total</p><span class="tooltiptext"> The next '+energybuilding.name[i]+' will produce <span class="bluetext">'+format(format(energybuilding.income[i])/format(energybuilding.cost[i])*10000000)/100+'</span> Energy <span class="orangetext">100.000</span> per Metal spent on building it. You have '+energybuilding.count[i]+' '+energybuilding.name[i]+'s, each producing <span class="bluetext">'+energybuilding.income[i]+'</span> Energy/s (for a total of <span class="bluetext">'+energybuilding.totalincome[i]+'</span> Energy/s)</span></div><br>'
            }
        }  
        document.getElementById("constructorContainer").innerHTML = "";
        for (i = 0; i < constructorbuilding.name.length; i++) {
            if (upgrade.purchased[52] == true) {
                if (constructorbuilding.cost[i] <= game.metal) 
                document.getElementById("constructorContainer").innerHTML += '<div class="constructorContainer tooltip canafford colums4" onclick="constructorbuilding.purchase('+i+')"><p>'+constructorbuilding.name[i]+'</p> <p>'+constructorbuilding.count[i]+'</p><p>Costs: '+format(constructorbuilding.cost[i])+' Metal</p><p>Produces '+constructorbuilding.count[i]+' Solar sails every '+format(((game.railguninterval/60000))*1000)/1000+' minutes</p><span class="tooltiptext">The railgun launcher comes complete with a fully equipped assembly line for solar sails. Automatically created Solar sails does not increase the cost of manually built Solar sails.</span></div><br>'
                else  document.getElementById("constructorContainer").innerHTML += '<div class="constructorContainer tooltip cantafford colums4" onclick="constructorbuilding.purchase('+i+')"><p>'+constructorbuilding.name[i]+'</p> <p>'+constructorbuilding.count[i]+'</p><p>Costs: '+format(constructorbuilding.cost[i])+' Metal</p><p>Produces '+constructorbuilding.count[i]+' Solar sails every '+format(((game.railguninterval/60000))*1000)/1000+' minutes</p><span class="tooltiptext">The railgun launcher comes complete with a fully equipped assembly line for solar sails. Automatically created Solar sails does not increase the cost of manually built Solar sails.</span></div><br>'
   
            }
        }
    },


    updateResearchding: function() {
        document.getElementById("reseachtab").classList.remove("ding")
        document.getElementById("miningtab").classList.remove("ding")
        document.getElementById("energytab").classList.remove("ding")
    },
    updateUpgrades: function() {

        document.getElementById("upgradeContainer").innerHTML = "";
        for (i = 0; i < upgrade.name.length; i++) {
            if(!upgrade.purchased[i]) {
                if (upgrade.type[i] == "metalbuilding" && metalbuilding.count[upgrade.metalbuildingIndex[i]] >= upgrade.requirement[i]) {
                    if (upgrade.cost[i] <= game.techpoints) 
                    document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip canafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext"> '+upgrade.description[i]+' </span></div><br>'
                    else document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip cantafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext"> '+upgrade.description[i]+' </span></div><br>'
                    
                }
                if (upgrade.type[i] == "researchbuilding" && researchbuilding.count[upgrade.researchbuildingIndex[i]] >= upgrade.requirement[i]) {
                    if (upgrade.cost[i] <= game.techpoints) 
                    document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip canafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext">'+upgrade.description[i]+'</span></div><br>'
                    else document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip cantafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext"> '+upgrade.description[i]+' </span></div><br>'
                }
                if (upgrade.type[i] == "energybuilding" && energybuilding.count[upgrade.energybuildingIndex[i]] >= upgrade.requirement[i]) {
                    if (upgrade.cost[i] <= game.techpoints) 
                    document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip canafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext">'+upgrade.description[i]+'</span></div><br>'
                    else document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip cantafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext"> '+upgrade.description[i]+' </span></div><br>'
                }
                if (upgrade.type[i] == "triconeupgrade" && metalbuilding.count[upgrade.metalbuildingIndex[i]] >= upgrade.requirement[i]) {
                    if (upgrade.cost[i] <= game.techpoints) 
                    document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip canafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext">'+upgrade.description[i]+'</span></div><br>'
                    else document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip cantafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext"> '+upgrade.description[i]+' </span></div><br>'
                }
                if (upgrade.type[i] == "Findinggold" && energybuilding.count[upgrade.energybuildingIndex[i]] >= upgrade.requirement[i]) {
                    if (upgrade.cost[i] <= game.techpoints) 
                    document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip canafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext">'+upgrade.description[i]+'</span></div><br>'
                    else document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip cantafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext"> '+upgrade.description[i]+' </span></div><br>'
                }
                if (upgrade.type[i] == "bobcatbuilding" && researchbuilding.count[upgrade.researchbuildingIndex[i]] >= upgrade.requirement[i]) {
                    if (upgrade.cost[i] <= game.techpoints) 
                    document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip canafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext">'+upgrade.description[i]+'</span></div><br>'
                    else document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip cantafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext"> '+upgrade.description[i]+' </span></div><br>'
                }
                if (upgrade.type[i] == "asteroidbuilding" && researchbuilding.count[upgrade.researchbuildingIndex[i]] >= upgrade.requirement[i]) {
                    if (upgrade.cost[i] <= game.techpoints) 
                    document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip canafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext">'+upgrade.description[i]+'</span></div><br>'
                    else document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip cantafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext"> '+upgrade.description[i]+' </span></div><br>'
                }
                if (upgrade.type[i] == "railgunlauncher" && metalbuilding.count[upgrade.metalbuildingIndex[i]] >= upgrade.requirement[i]) {
                    if (upgrade.cost[i] <= game.techpoints) 
                    document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip canafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext">'+upgrade.description[i]+'</span></div><br>'
                    else document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip cantafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext"> '+upgrade.description[i]+' </span></div><br>'
                }
                if (upgrade.type[i] == "civilization" && researchbuildingt2.count[1] >= 10) {
                    if (upgrade.cost[i] <= game.techpoints) 
                    document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip canafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext">'+upgrade.description[i]+'</span></div><br>'
                    else document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip cantafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext"> '+upgrade.description[i]+' </span></div><br>'
                }
                if (upgrade.type[i] == "aiupgrade" && researchbuilding.count[1] >= 36) {
                    if (upgrade.cost[i] <= game.techpoints) 
                    document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip canafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext">'+upgrade.description[i]+'</span></div><br>'
                    else document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip cantafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext"> '+upgrade.description[i]+' </span></div><br>'
                }
                if (upgrade.type[i] == "railgunreq" && constructorbuilding.count[0] >= 1) {
                    if (upgrade.cost[i] <= game.techpoints) 
                    document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip canafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext">'+upgrade.description[i]+'</span></div><br>'
                    else document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip cantafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext"> '+upgrade.description[i]+' </span></div><br>'
                }
                if (upgrade.type[i] == "truebuilding" && metalbuilding.count[5] >= 1) {
                    if (upgrade.cost[i] <= game.techpoints) 
                    document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip canafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext">'+upgrade.description[i]+'</span></div><br>'
                    else document.getElementById("upgradeContainer").innerHTML += '<div class="upgradeContainer tooltip cantafford" onclick="upgrade.purchase('+i+')"><p>'+upgrade.name[i]+'<br>'+format(upgrade.cost[i])+' Tech Points</p><span class="tooltiptext"> '+upgrade.description[i]+' </span></div><br>'
                }
            }
        }
    }
}


var progress = document.getElementById('metalprogress');
function updateValue(prog) {
    progress.style.width = prog+'%';
}

var railprogress = document.getElementById('railbar');
function updateValues(railgunperc) {
    railprogress.style.width = railgunperc+'%';
}




function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if(localStorage.getItem("gameSave") !== null) {
        if (typeof savedGame.metal !== "undefined") game.metal = savedGame.metal;
        if (typeof savedGame.totalmetal !== "undefined") game.totalmetal = savedGame.totalmetal;
        if (typeof savedGame.totalmetalmined !== "undefined") game.totalmetalmined = savedGame.totalmetalmined;
        if (typeof savedGame.metalpersecondtwo !== "undefined") game.metalpersecondtwo = savedGame.metalpersecondtwo;
        if (typeof savedGame.energy !== "undefined") game.energy = savedGame.energy;
        if (typeof savedGame.railguninterval !== "undefined") game.railguninterval = savedGame.railguninterval;
        if (typeof savedGame.techpoints !== "undefined") game.techpoints = savedGame.techpoints;
        if (typeof savedGame.techinterval !== "undefined") game.techinterval = savedGame.techinterval;
        if (typeof savedGame.absoluteenergy !== "undefined") game.absoluteenergy = savedGame.absoluteenergy;
        if (typeof savedGame.energybuildingcount !== "undefined") {
            for (i = 0; i < savedGame.energybuildingcount.length; i++) {
                energybuilding.count[i] = savedGame.energybuildingcount[i];
            }
        };
        if (typeof savedGame.energybuildingincome !== "undefined") {          
            for (i = 0; i < savedGame.energybuildingincome.length; i++) {
                energybuilding.income[i] = savedGame.energybuildingincome[i];
            }
        };
        if (typeof savedGame.energybuildingcost !== "undefined") {          
            for (i = 0; i < savedGame.energybuildingcost.length; i++) {
                energybuilding.cost[i] = savedGame.energybuildingcost[i];
            }
        };
        if (typeof savedGame.energybuildingtotalincome !== "undefined") {          
            for (i = 0; i < savedGame.energybuildingtotalincome.length; i++) {
                energybuilding.totalincome[i] = savedGame.energybuildingtotalincome[i];
            }
        };
        if (typeof savedGame.energybuildingabsoluteincome !== "undefined") {          
            for (i = 0; i < savedGame.energybuildingabsoluteincome.length; i++) {
                energybuilding.absoluteincome[i] = savedGame.energybuildingabsoluteincome[i];
            }
        };
        if (typeof savedGame.energybuildingpartoftotal !== "undefined") {          
            for (i = 0; i < savedGame.energybuildingpartoftotal.length; i++) {
                energybuilding.partoftotal[i] = savedGame.energybuildingpartoftotal[i];
            }
        };
        if (typeof savedGame.researchbuildingcount !== "undefined") {          
            for (i = 0; i < savedGame.researchbuildingcount.length; i++) {
                researchbuilding.count[i] = savedGame.researchbuildingcount[i];
            }
        };
        if (typeof savedGame.researchbuildingincrease !== "undefined") {          
            for (i = 0; i < savedGame.researchbuildingincrease.length; i++) {
                researchbuilding.increase[i] = savedGame.researchbuildingincrease[i];
            }
        };
        if (typeof savedGame.researchbuildingmetalcost !== "undefined") {          
            for (i = 0; i < savedGame.researchbuildingmetalcost.length; i++) {
                researchbuilding.metalcost[i] = savedGame.researchbuildingmetalcost[i];
            }
        };
        if (typeof savedGame.researchbuildinginitialmetalcost !== "undefined") {          
            for (i = 0; i < savedGame.researchbuildinginitialmetalcost.length; i++) {
                researchbuilding.initialmetalcost[i] = savedGame.researchbuildinginitialmetalcost[i];
            }
        };
        if (typeof savedGame.researchbuildinginitialenergycost !== "undefined") {          
            for (i = 0; i < savedGame.researchbuildinginitialenergycost.length; i++) {
                researchbuilding.initialenergycost[i] = savedGame.researchbuildinginitialenergycost[i];
            }
        };     
        if (typeof savedGame.researchbuildingenergycost !== "undefined") {          
            for (i = 0; i < savedGame.researchbuildingenergycost.length; i++) {
                researchbuilding.energycost[i] = savedGame.researchbuildingenergycost[i];
            }
        };        
        if (typeof savedGame.researchbuildingtotalincome !== "undefined") {          
            for (i = 0; i < savedGame.researchbuildingtotalincome.length; i++) {
                researchbuilding.totalincome[i] = savedGame.researchbuildingtotalincome[i];
            }
        };    
        if (typeof savedGame.metalbuildingcount !== "undefined") {          
            for (i = 0; i < savedGame.metalbuildingcount.length; i++) {
                metalbuilding.count[i] = savedGame.metalbuildingcount[i];
            }
        };        
        if (typeof savedGame.metalbuildingincome !== "undefined") {          
            for (i = 0; i < savedGame.metalbuildingincome.length; i++) {
                metalbuilding.income[i] = savedGame.metalbuildingincome[i];
            }
        };    
        if (typeof savedGame.metalbuildingcost !== "undefined") {          
            for (i = 0; i < savedGame.metalbuildingcost.length; i++) {
                metalbuilding.cost[i] = savedGame.metalbuildingcost[i];
            }
        };
        if (typeof savedGame.metalbuildingtotalincome !== "undefined") {          
            for (i = 0; i < savedGame.metalbuildingtotalincome.length; i++) {
                metalbuilding.totalincome[i] = savedGame.metalbuildingtotalincome[i];
            }
        };
        if (typeof savedGame.metalbuildingpartoftotal !== "undefined") {          
            for (i = 0; i < savedGame.metalbuildingpartoftotal.length; i++) {
                metalbuilding.partoftotal[i] = savedGame.metalbuildingpartoftotal[i];
            }
        };
        if (typeof savedGame.upgradepurchased !== "undefined") {          
            for (i = 0; i < savedGame.upgradepurchased.length; i++) {
                upgrade.purchased[i] = savedGame.upgradepurchased[i];
            }
        }
        if (typeof savedGame.constructorbuildingcount !== "undefined") {          
            for (i = 0; i < savedGame.constructorbuildingcount.length; i++) {
                constructorbuilding.count[i] = savedGame.constructorbuildingcount[i];
            }
        }
        if (typeof savedGame.constructorbuildingcost !== "undefined") {          
            for (i = 0; i < savedGame.constructorbuildingcost.length; i++) {
                constructorbuilding.cost[i] = savedGame.constructorbuildingcost[i];
            }
        }
        if (typeof savedGame.researchbuildingt2count !== "undefined") {          
            for (i = 0; i < savedGame.researchbuildingt2count.length; i++) {
                researchbuildingt2.count[i] = savedGame.researchbuildingt2count[i];
            }
        }
        if (typeof savedGame.researchbuildingt2metalcost !== "undefined") {          
            for (i = 0; i < savedGame.researchbuildingt2metalcost.length; i++) {
                researchbuildingt2.metalcost[i] = savedGame.researchbuildingt2metalcost[i];
            }
        }
        if (typeof savedGame.researchbuildingt2energycost !== "undefined") {          
            for (i = 0; i < savedGame.researchbuildingt2energycost.length; i++) {
                researchbuildingt2.energycost[i] = savedGame.researchbuildingt2energycost[i];
            }
        }
        if (typeof savedGame.researchbuildingt2techcost !== "undefined") {          
            for (i = 0; i < savedGame.researchbuildingt2techcost.length; i++) {
                researchbuildingt2.techcost[i] = savedGame.researchbuildingt2techcost[i];
            }
        }
        if (typeof savedGame.researchbuildingt2income !== "undefined") {          
            for (i = 0; i < savedGame.researchbuildingt2income.length; i++) {
                researchbuildingt2.income[i] = savedGame.researchbuildingt2income[i];
            }
        }
        if (typeof savedGame.researchbuildingt2totalincome !== "undefined") {          
            for (i = 0; i < savedGame.researchbuildingt2totalincome.length; i++) {
                researchbuildingt2.totalincome[i] = savedGame.researchbuildingt2totalincome[i];
            }
        }
        if (typeof savedGame.researchbuildingaddedenergycost !== "undefined") {          
            for (i = 0; i < savedGame.researchbuildingaddedenergycost.length; i++) {
                researchbuilding.addedenergycost[i] = savedGame.researchbuildingaddedenergycost[i];
            }
        }
        if (typeof savedGame.qd !== "undefined") game.qd = savedGame.qd;
        if (typeof savedGame.railguntick !== "undefined") game.railguntick = savedGame.railguntick;
    }
}



window.onload = function() {
    loadGame();
    display.updateMetal();
    display.updateGenerators();
    display.updateUpgrades();
    display.updateResearch();
    display.updateEnergy();
    display.updateResearchding();
}






function saveGame() {
    document.getElementById("savepopup").innerHTML="Game Saved";
    setTimeout(function(){
        document.getElementById("savepopup").innerHTML = "";
    }, 2000);
    var gameSave = {
        metal: game.metal,
        totalmetal: game.totalmetal,
        totalmetalmined: game.totalmetalmined,
        metalpersecondtwo: game.metalpersecondtwo,
        energy: game.energy,
        railguninterval: game.railguninterval,
        techpoints: game.techpoints,
        techinterval: game.techinterval,
        absoluteenergy: game.absoluteenergy,
        energybuildingcount: energybuilding.count,
        energybuildingincome: energybuilding.income,
        energybuildingcost: energybuilding.cost,
        energybuildingtotalincome: energybuilding.totalincome,
        energybuildingabsoluteincome: energybuilding.absoluteincome,
        energybuildingpartoftotal: energybuilding.partoftotal,
        researchbuildingcount: researchbuilding.count,
        researchbuildingincrease: researchbuilding.increase,
        researchbuildingmetalcost: researchbuilding.metalcost,
        researchbuildinginitialmetalcost: researchbuilding.initialmetalcost,
        researchbuildinginitialenergycost: researchbuilding.initialenergycost,
        researchbuildingenergycost: researchbuilding.energycost,
        researchbuildingtotalincome: researchbuilding.totalincome,
        metalbuildingcount: metalbuilding.count,
        metalbuildingincome: metalbuilding.income,
        metalbuildingcost: metalbuilding.cost,
        metalbuildingtotalincome: metalbuilding.totalincome,
        metalbuildingpartoftotal: metalbuilding.partoftotal,
        upgradepurchased: upgrade.purchased,
        constructorbuildingcount: constructorbuilding.count,
        constructorbuildingcost: constructorbuilding.cost,
        qd:game.qd,
        researchbuildingt2count: researchbuildingt2.count,
        researchbuildingt2metalcost: researchbuildingt2.metalcost,
        researchbuildingt2energycost: researchbuildingt2.energycost,
        researchbuildingt2techcost: researchbuildingt2.techcost,
        researchbuildingt2income: researchbuildingt2.income,
        researchbuildingt2totalincome: researchbuildingt2.totalincome,
        railguntick: game.railguntick,
        researchbuildingaddedenergycost: researchbuilding.addedenergycost


    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}



setInterval (function() {
    saveGame();

}, 30000);




function resetGame() {
    if (confirm("Are you sure you want to reset your game")) {
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }

}



setInterval (function() {
    if (upgrade.purchased[53] == true){
        game.metal += game.getMetalPerSecond() * (0.01*game.energy);
        game.totalmetalmined += game.getMetalPerSecond() * (0.01*game.energy);
    } else {
        game.metal += game.getMetalPerSecond();
        game.totalmetalmined += game.getMetalPerSecond();
    } 
    for (i = 0; i < energybuilding.name.length; i++) {
        energybuilding.absoluteincome[i] = energybuilding.income[i] * (energybuilding.count[i]);
    }
    game.absoluteenergy == (energybuilding.absoluteincome[0]+energybuilding.absoluteincome[1]+energybuilding.absoluteincome[2]+energybuilding.absoluteincome[3]+energybuilding.absoluteincome[4])
    if (game.absoluteenergy != 0) {
    energybuilding.partoftotal[0] = (energybuilding.absoluteincome[0]) / game.absoluteenergy
    energybuilding.partoftotal[1] = (energybuilding.absoluteincome[1]) / game.absoluteenergy
    energybuilding.partoftotal[2] = (energybuilding.absoluteincome[2]) / game.absoluteenergy
    energybuilding.partoftotal[3] = (energybuilding.absoluteincome[3]) / game.absoluteenergy
    energybuilding.partoftotal[4] = (energybuilding.absoluteincome[4]) / game.absoluteenergy
    }
    game.getProgress();
    display.updateResearchding();
    display.updateEnergy();
    display.updateMetal();
    display.updateGenerators();
    display.updateResearch();
    display.updateUpgrades();
}, 1000);


