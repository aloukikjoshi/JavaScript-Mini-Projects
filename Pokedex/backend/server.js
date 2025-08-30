const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

 
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Type effectiveness chart for calculating weaknesses
const typeChart = {
  normal: { weak_to: ['fighting'], resist: [], immune: ['ghost'] },
  fire: { weak_to: ['water', 'ground', 'rock'], resist: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'], immune: [] },
  water: { weak_to: ['electric', 'grass'], resist: ['fire', 'water', 'ice', 'steel'], immune: [] },
  electric: { weak_to: ['ground'], resist: ['electric', 'flying', 'steel'], immune: [] },
  grass: { weak_to: ['fire', 'ice', 'poison', 'flying', 'bug'], resist: ['water', 'electric', 'grass', 'ground'], immune: [] },
  ice: { weak_to: ['fire', 'fighting', 'rock', 'steel'], resist: ['ice'], immune: [] },
  fighting: { weak_to: ['flying', 'psychic', 'fairy'], resist: ['bug', 'rock', 'dark'], immune: [] },
  poison: { weak_to: ['ground', 'psychic'], resist: ['grass', 'fighting', 'poison', 'bug', 'fairy'], immune: [] },
  ground: { weak_to: ['water', 'grass', 'ice'], resist: ['poison', 'rock'], immune: ['electric'] },
  flying: { weak_to: ['electric', 'ice', 'rock'], resist: ['grass', 'fighting', 'bug'], immune: ['ground'] },
  psychic: { weak_to: ['bug', 'ghost', 'dark'], resist: ['fighting', 'psychic'], immune: [] },
  bug: { weak_to: ['fire', 'flying', 'rock'], resist: ['grass', 'fighting', 'ground'], immune: [] },
  rock: { weak_to: ['water', 'grass', 'fighting', 'ground', 'steel'], resist: ['normal', 'fire', 'poison', 'flying'], immune: [] },
  ghost: { weak_to: ['ghost', 'dark'], resist: ['poison', 'bug'], immune: ['normal', 'fighting'] },
  dragon: { weak_to: ['ice', 'dragon', 'fairy'], resist: ['fire', 'water', 'electric', 'grass'], immune: [] },
  dark: { weak_to: ['fighting', 'bug', 'fairy'], resist: ['ghost', 'dark'], immune: ['psychic'] },
  steel: { weak_to: ['fire', 'fighting', 'ground'], resist: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'], immune: ['poison'] },
  fairy: { weak_to: ['poison', 'steel'], resist: ['fighting', 'bug', 'dark'], immune: ['dragon'] }
};

// Calculate type weaknesses and resistances
function calculateTypeEffectiveness(pokemonTypes) {
  const weaknesses = new Set();
  const resistances = new Set();
  const immunities = new Set();

  pokemonTypes.forEach(pokemonType => {
    const typeName = pokemonType.type.name;
    const typeData = typeChart[typeName];
    
    if (typeData) {
      typeData.weak_to.forEach(type => weaknesses.add(type));
      typeData.resist.forEach(type => resistances.add(type));
      typeData.immune.forEach(type => immunities.add(type));
    }
  });

  // Remove immunities from weaknesses and resistances
  immunities.forEach(type => {
    weaknesses.delete(type);
    resistances.delete(type);
  });

  // Remove resistances from weaknesses
  resistances.forEach(type => {
    weaknesses.delete(type);
  });

  return {
    weaknesses: Array.from(weaknesses),
    resistances: Array.from(resistances),
    immunities: Array.from(immunities)
  };
}

// Main endpoint to get Pokémon data
app.get('/api/pokemon/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Fetch main Pokémon data
    const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${identifier.toLowerCase()}`);
    const pokemonData = pokemonResponse.data;

    // Fetch species data for additional information
    const speciesResponse = await axios.get(pokemonData.species.url);
    const speciesData = speciesResponse.data;

    // Calculate type effectiveness
    const typeEffectiveness = calculateTypeEffectiveness(pokemonData.types);

    // Process abilities
    const abilities = pokemonData.abilities.map(abilityData => ({
      name: abilityData.ability.name,
      is_hidden: abilityData.is_hidden,
      slot: abilityData.slot
    }));

    // Process stats
    const stats = pokemonData.stats.map(statData => ({
      name: statData.stat.name,
      base_stat: statData.base_stat,
      effort: statData.effort
    }));

    // Process types
    const types = pokemonData.types.map(typeData => ({
      name: typeData.type.name,
      slot: typeData.slot
    }));

    // Process moves (limit to first 20 for performance)
    const moves = pokemonData.moves.slice(0, 20).map(moveData => ({
      name: moveData.move.name,
      learn_methods: moveData.version_group_details.map(detail => ({
        method: detail.move_learn_method.name,
        level: detail.level_learned_at,
        version_group: detail.version_group.name
      }))
    }));

    // Process sprites
    const sprites = {
      front_default: pokemonData.sprites.front_default,
      front_shiny: pokemonData.sprites.front_shiny,
      back_default: pokemonData.sprites.back_default,
      back_shiny: pokemonData.sprites.back_shiny,
      front_female: pokemonData.sprites.front_female,
      front_shiny_female: pokemonData.sprites.front_shiny_female,
      official_artwork: pokemonData.sprites.other?.['official-artwork']?.front_default || null,
      home: pokemonData.sprites.other?.home?.front_default || null
    };

    // Process held items
    const heldItems = pokemonData.held_items.map(itemData => ({
      name: itemData.item.name,
      rarity_details: itemData.version_details.map(detail => ({
        version: detail.version.name,
        rarity: detail.rarity
      }))
    }));

    // Process game indices
    const gameIndices = pokemonData.game_indices.map(gameData => ({
      game_index: gameData.game_index,
      version: gameData.version.name
    }));

    // Get evolution chain information
    let evolutionChain = null;
    try {
      if (speciesData.evolution_chain) {
        const evolutionResponse = await axios.get(speciesData.evolution_chain.url);
        evolutionChain = evolutionResponse.data;
      }
    } catch (error) {
      console.log('Evolution chain fetch failed:', error.message);
    }

    // Compile comprehensive Pokémon data
    const comprehensivePokemonData = {
      // Basic Information
      id: pokemonData.id,
      name: pokemonData.name,
      species_name: speciesData.name,
      
      // Physical Characteristics
      height: pokemonData.height * 10, // in centimeters
      weight: pokemonData.weight / 10, // in kilograms
      base_experience: pokemonData.base_experience,
      
      // Ordering and Classification
      order: pokemonData.order,
      is_default: pokemonData.is_default,
      
      // Types and Type Effectiveness
      types: types,
      type_effectiveness: typeEffectiveness,
      past_types: pokemonData.past_types,
      
      // Abilities
      abilities: abilities,
      past_abilities: pokemonData.past_abilities,
      
      // Stats
      stats: stats,
      
      // Moves (limited for performance)
      moves: moves,
      total_moves_count: pokemonData.moves.length,
      
      // Visual and Audio
      sprites: sprites,
      cries: pokemonData.cries || null,
      
      // Items and Game Data
      held_items: heldItems,
      game_indices: gameIndices,
      
      // Species Information
      species_info: {
        base_happiness: speciesData.base_happiness,
        capture_rate: speciesData.capture_rate,
        color: speciesData.color?.name || null,
        egg_groups: speciesData.egg_groups?.map(eg => eg.name) || [],
        evolution_chain_id: speciesData.evolution_chain?.url?.split('/').slice(-2, -1)[0] || null,
        forms_switchable: speciesData.forms_switchable,
        gender_rate: speciesData.gender_rate,
        generation: speciesData.generation?.name || null,
        growth_rate: speciesData.growth_rate?.name || null,
        habitat: speciesData.habitat?.name || null,
        has_gender_differences: speciesData.has_gender_differences,
        hatch_counter: speciesData.hatch_counter,
        is_baby: speciesData.is_baby,
        is_legendary: speciesData.is_legendary,
        is_mythical: speciesData.is_mythical,
        shape: speciesData.shape?.name || null
      },
      
      // Additional metadata
      forms: pokemonData.forms,
      location_area_encounters: pokemonData.location_area_encounters,
      evolution_chain: evolutionChain ? {
        id: evolutionChain.id,
        baby_trigger_item: evolutionChain.baby_trigger_item,
        chain: evolutionChain.chain
      } : null
    };

    res.json({
      success: true,
      data: comprehensivePokemonData
    });

  } catch (error) {
    console.error('Error fetching Pokémon data:', error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        error: 'Pokémon not found',
        message: 'The requested Pokémon does not exist in the database.'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch Pokémon data from the API.'
    });
  }
});

// Endpoint to get all moves for a specific Pokémon 
app.get('/api/pokemon/:identifier/moves', async (req, res) => {
  try {
    const { identifier } = req.params;

    // Fetch Pokémon data
    const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${identifier.toLowerCase()}`);
    const pokemonData = pokemonResponse.data;

    // Limit moves for performance (remove .slice if you want all)
    const movesToFetch = pokemonData.moves.slice(0, 20);

    // Fetch move details in parallel
    const moveDetails = await Promise.all(
      movesToFetch.map(async moveData => {
        // Fetch move metadata
        const moveResponse = await axios.get(moveData.move.url);
        const move = moveResponse.data;

        // Get English effect entry
        const effectEntry = move.effect_entries.find(e => e.language.name === 'en');
        const shortEffect = effectEntry ? effectEntry.short_effect : null;

        return {
          id: move.id,
          name: move.name,
          type: move.type.name,
          power: move.power,
          accuracy: move.accuracy,
          pp: move.pp,
          priority: move.priority,
          damage_class: move.damage_class.name,
          effect: shortEffect,
          version_group_details: moveData.version_group_details.map(detail => ({
            method: detail.move_learn_method.name,
            level: detail.level_learned_at,
            version_group: detail.version_group.name
          }))
        };
      })
    );

    res.json({
      success: true,
      data: {
        pokemon_name: pokemonData.name,
        total_moves: pokemonData.moves.length,
        moves: moveDetails
      }
    });

  } catch (error) {
    console.error('Error fetching Pokémon moves:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Pokémon moves'
    });
  }
});


// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Pokédex API is running!',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: 'The requested endpoint does not exist.'
  });
});


// Serve the main HTML file 
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Pokédex API server is running on port ${PORT}`);
  console.log(`📱 Frontend is served at http://localhost:${PORT}`);
  console.log(`📖 API Documentation:`);
  console.log(`   GET /api/pokemon/{id or name} - Get complete Pokémon data`);
  console.log(`   GET /api/pokemon/{id or name}/moves - Get all moves for a Pokémon`);
  console.log(`   GET /api/health - Health check`);
});

module.exports = app;