const Vec3 = require('tera-vec3');

module.exports = function placer(mod) {
    // No autoreset on this zones
    const blacklist = [9777, 9713, 9916, 9970, 9770];
	// Autoreset and swap zones
    const whitelist = [9031, 9032, 9769, 9969];

    let enabled = true,
		dungeon,
		loot,
		zone;

    mod.command.add('placer', () => {
        enabled = !enabled;
        mod.command.message(`Auto-placer dungeons is now ${enabled ? "enabled" : "disabled"}.`);
    });		
		
    mod.hook('S_LOAD_TOPO', 3, event => {
        zone = event.zone;
        loot = {};
        dungeon = [];

        mod.send('C_DUNGEON_COOL_TIME_LIST', 1, {});
    });

    mod.hook('S_DUNGEON_COOL_TIME_LIST', 1, event => {
        dungeon = event.dungeons;
    });
        
    mod.hook('S_SPAWN_ME', 3, event => {
		if (!enabled) return;
        switch(zone) {
            case 9777: // Channelworks
				event.loc = new Vec3(-112670, -33091, 461)
				event.w = 1.5
                return true;
            case 9713: // Ghillie
				event.loc = new Vec3(52233, 117319, 4382)
				event.w = 1.5
                return true;
            case 9031: // Ace Akasha	
				event.loc = new Vec3(72424, 133968, -502)
				event.w = 1.5
                return true;
			case 9032: // Ace Baracos
				event.loc = new Vec3(28214, 178550, -1675)
				event.w = 1.5
                return true;
            case 9769: // Lilitas Facile
				event.loc = new Vec3(-99661, 34492, 6480)
				event.w = 1.5
                return true;
			case 9969: // Lilitas HM
				event.loc = new Vec3(-99661, 34492, 6480)
				event.w = 1.5
                return true;
            case 9916: // Sky Cruiser Extreme
				event.loc = new Vec3(49503, 128043, -3613)
				event.w = 1.5
                return true;
			case 9716: // Sky Cruiser NM
				event.loc = new Vec3(57362, 132452, 1965)
				event.w = 1.5
                return true;
			case 9770: // Rm NM
				event.loc = new Vec3(-99681, 3881, 6480)
				event.w = 1.5
                return true;
			case 9970: // Rm HM
				event.loc = new Vec3(-99681, 3881, 6480)
				event.w = 1.5
                return true;
			case 9794: // Tr NM
				event.loc = new Vec3(-53671, 42420, 1462)
				event.w = 1.5
                return true;
			case 9994: // Tr HM
				event.loc = new Vec3(-53671, 42420, 1462)
				event.w = 1.5
                return true;
			case 9710: // Lakan HM
				event.loc = new Vec3(-82993, 38605, 13545)
				event.w = 1.5
                return true;
			case 9782: // Lian NM
				event.loc = new Vec3(-104863, 144827, 7038)
				event.w = 1.5
                return true;	
			case 9982: // Lian HM
				event.loc = new Vec3(-104863, 144827, 7038)
				event.w = 1.5
                return true;	
			case 9739: // RR NM
				event.loc = new Vec3(55960, -98075, 2199)
				event.w = 1.5
                return true;	
			case 9939: // RR HM
				event.loc = new Vec3(55960, -98075, 2199)
				event.w = 1.5
                return true;	
			case 9735: // RK9 NM
				event.loc = new Vec3(-41411, 40622, -954)
				event.w = 1.5
                return true;	
			case 9935: // RK9 HM
				event.loc = new Vec3(-41411, 40622, -954)
				event.w = 1.5
                return true;	
			case 9783: // Téné NM
				event.loc = new Vec3(-87641, -193104, 10226)
				event.w = 1.5
                return true;	
			case 9983: // Téné HM
				event.loc = new Vec3(-87641, -193104, 10226)
				event.w = 1.5
                return true;
			case 9720: // AA NM
				event.loc = new Vec3(34362, -96473, 152)
				event.w = 1.5
                return true;
			case 9920: // AA HM
				event.loc = new Vec3(34362, -96473, 152)
				event.w = 1.5
                return true;
			case 9044: // Bahaar
				event.loc = new Vec3(-98067, 99608, 4358)
				event.w = 1.5
                return true;				
            default: return;
        }
	});

	// New packet definition which uses gameId instead of Id
    mod.hook('S_SPAWN_DROPITEM', 6, event => {
        if(!(blacklist.indexOf(event.item) > -1)) loot[event.gameId.toString()] = 1;
    });
	// New packet definition which uses gameId instead of Id
    mod.hook('S_DESPAWN_DROPITEM', 4, event => {
        if(event.gameId.toString() in loot) delete loot[event.gameId.toString()];
        if(Object.keys(loot).length < 1 && zone > 9000) Resetinstance();
    });
	// Reset works but no swap if all entries are consumed
    function Resetinstance() {
		if (!enabled) return;
        if((zone == 9031 || zone == 9032) && whitelist.indexOf(zone) > -1)  mod.send('C_RESET_ALL_DUNGEON', 1, null);
    }
}
