const API_BASE_URL = 'http://localhost:3000/api';
        let currentPokemonName = '';

        // Page Navigation
        function showLandingPage() {
            document.getElementById('landingPage').style.display = 'flex';
            document.getElementById('searchPage').style.display = 'none';
            document.getElementById('movesPage').style.display = 'none';
        }

        function showSearchPage() {
            document.getElementById('landingPage').style.display = 'none';
            document.getElementById('searchPage').style.display = 'block';
            document.getElementById('movesPage').style.display = 'none';
            document.getElementById('pokemonInput').focus();
        }

        function showPokemonDetails() {
            document.getElementById('searchPage').style.display = 'block';
            document.getElementById('movesPage').style.display = 'none';
        }

        function showMoves() {
            document.getElementById('searchPage').style.display = 'none';
            document.getElementById('movesPage').style.display = 'block';
            loadPokemonMoves();
        }

        // Handle Enter key in search input
        function handleEnterKey(event) {
            if (event.key === 'Enter') {
                searchPokemon();
            }
        }

        // Search Pokemon
        async function searchPokemon() {
            const input = document.getElementById('pokemonInput').value.trim();
            if (!input) {
                showError('Please enter a Pokémon name or ID');
                return;
            }

            showLoading();
            hideError();
            hidePokemonContainer();

            try {
                const response = await fetch(`${API_BASE_URL}/pokemon/${input}`);
                const result = await response.json();

                if (result.success) {
                    currentPokemonName = result.data.name;
                    displayPokemon(result.data);
                } else {
                    showError(result.message || 'Pokémon not found');
                }
            } catch (error) {
                console.error('Error:', error);
                showError('Failed to fetch Pokémon data. Make sure your backend server is running!');
            } finally {
                hideLoading();
            }
        }

        // Display Pokemon Data
        function displayPokemon(pokemon) {
            // Basic info
            document.getElementById('pokemonName').textContent = pokemon.name;
            document.getElementById('pokemonId').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
            document.getElementById('pokemonImage').src = pokemon.sprites.official_artwork || pokemon.sprites.front_default;
            document.getElementById('pokemonHeight').textContent = pokemon.height;
            document.getElementById('pokemonWeight').textContent = pokemon.weight;
            document.getElementById('pokemonExp').textContent = pokemon.base_experience;

            // Types
            const typesContainer = document.getElementById('pokemonTypes');
            typesContainer.innerHTML = '';
            pokemon.types.forEach(type => {
                const typeBadge = document.createElement('span');
                typeBadge.className = `type-badge type-${type.name}`;
                typeBadge.textContent = type.name;
                typesContainer.appendChild(typeBadge);
            });

            // Abilities
            const abilitiesContainer = document.getElementById('pokemonAbilities');
            abilitiesContainer.innerHTML = '';
            pokemon.abilities.forEach(ability => {
                const abilityBadge = document.createElement('span');
                abilityBadge.className = 'ability-badge';
                abilityBadge.textContent = ability.name + (ability.is_hidden ? ' (Hidden)' : '');
                abilitiesContainer.appendChild(abilityBadge);
            });

            // Weaknesses
            const weaknessesContainer = document.getElementById('pokemonWeaknesses');
            weaknessesContainer.innerHTML = '';
            pokemon.type_effectiveness.weaknesses.forEach(weakness => {
                const weaknessBadge = document.createElement('span');
                weaknessBadge.className = 'weakness-badge';
                weaknessBadge.textContent = weakness;
                weaknessesContainer.appendChild(weaknessBadge);
            });

            // Stats
            const statsContainer = document.getElementById('pokemonStats');
            statsContainer.innerHTML = '';
            pokemon.stats.forEach(stat => {
                const statRow = document.createElement('div');
                statRow.className = 'stat-row';
                statRow.innerHTML = `
                    <span class="stat-name">${stat.name.replace('-', ' ')}</span>
                    <span class="stat-value">${stat.base_stat}</span>
                `;
                statsContainer.appendChild(statRow);
            });

            // Species info
            const speciesContainer = document.getElementById('speciesInfo');
            speciesContainer.innerHTML = `
                <p><strong>Generation:</strong> ${pokemon.species_info.generation || 'Unknown'}</p>
                <p><strong>Capture Rate:</strong> ${pokemon.species_info.capture_rate}</p>
                <p><strong>Base Happiness:</strong> ${pokemon.species_info.base_happiness}</p>
                <p><strong>Growth Rate:</strong> ${pokemon.species_info.growth_rate || 'Unknown'}</p>
                <p><strong>Habitat:</strong> ${pokemon.species_info.habitat || 'Unknown'}</p>
                <p><strong>Legendary:</strong> ${pokemon.species_info.is_legendary ? 'Yes' : 'No'}</p>
                <p><strong>Mythical:</strong> ${pokemon.species_info.is_mythical ? 'Yes' : 'No'}</p>
            `;

            showPokemonContainer();
        }

        // Load Pokemon Moves
        async function loadPokemonMoves() {
            if (!currentPokemonName) return;

            document.getElementById('movesTitle').textContent = `${currentPokemonName.charAt(0).toUpperCase() + currentPokemonName.slice(1)}'s Moves`;
            document.getElementById('movesLoading').style.display = 'block';
            document.getElementById('movesGrid').innerHTML = '';

            try {
                const response = await fetch(`${API_BASE_URL}/pokemon/${currentPokemonName}/moves`);
                const result = await response.json();

                if (result.success) {
                    document.getElementById('movesSubtitle').textContent = `Total Moves: ${result.data.total_moves}`;
                    displayMoves(result.data.moves);
                } else {
                    showError('Failed to load moves');
                }
            } catch (error) {
                console.error('Error loading moves:', error);
                showError('Failed to fetch moves data');
            } finally {
                document.getElementById('movesLoading').style.display = 'none';
            }
        }

                // Display Moves
        function displayMoves(moves) {
            const movesGrid = document.getElementById('movesGrid');
            movesGrid.innerHTML = '';

            moves.forEach(move => {
                // Type badge color class
                const typeClass = `type-badge type-${move.type}`;

                // Move card as a row in the grid
                movesGrid.innerHTML += `
                    <div class="move-card"><span class="move-name">${move.name.replace('-', ' ')}</span></div>
                    <div class="move-card"><span class="move-type-badge ${typeClass}">${move.type}</span></div>
                    <div class="move-card">${move.power !== null ? move.power : '-'}</div>
                    <div class="move-card">${move.accuracy !== null ? move.accuracy : '-'}</div>
                    <div class="move-card">${move.pp !== null ? move.pp : '-'}</div>
                    <div class="move-card">${move.damage_class}</div>
                    <div class="move-card"><span class="move-effect">${move.effect || '-'}</span></div>`;
            });
        }

        // Utility Functions
        function showLoading() {
            document.getElementById('loading').style.display = 'block';
        }

        function hideLoading() {
            document.getElementById('loading').style.display = 'none';
        }

        function showError(message) {
            const errorElement = document.getElementById('error');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        function hideError() {
            document.getElementById('error').style.display = 'none';
        }

        function showPokemonContainer() {
            document.getElementById('pokemonContainer').style.display = 'block';
        }

        function hidePokemonContainer() {
            document.getElementById('pokemonContainer').style.display = 'none';
        }

        // Initialize app
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Pokédex app initialized!');
        });