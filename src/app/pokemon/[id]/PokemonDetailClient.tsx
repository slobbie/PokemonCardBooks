'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePokemonDetail } from '@/entities/pokemon/api/usePokemonDetail';
import Navbar from '@/components/organisms/Navbar';
import { TYPE_GLOWS } from '@/lib/constants';
import { usePokemonFilterStore } from '@/features/pokemon-filter/model/pokemonFilterStore';
import { PokemonDetailSkeleton } from '@/components/pokemon/PokemonDetailSkeleton';
import Button from '@/components/atoms/Button';
import { ArrowLeft } from 'lucide-react';

import PokemonVisuals from '@/components/organisms/pokemon/detail-sections/PokemonVisuals';
import PokemonInfo from '@/components/organisms/pokemon/detail-sections/PokemonInfo';
import QuickStats from '@/components/organisms/pokemon/detail-sections/QuickStats';
import StatAnalysis from '@/components/organisms/pokemon/detail-sections/StatAnalysis';
import EvolutionChain from '@/components/organisms/pokemon/detail-sections/EvolutionChain';

/**
 * 포켓몬 상세 정보 클라이언트 컴포넌트
 */
const PokemonDetailClient = () => {
  const routeParams = useParams();
  const pokemonIdOrName = routeParams?.id as string;
  const navigationRouter = useRouter();

  const {
    data: fetchedPokemon,
    isLoading: isPokemonLoading,
    isError: hasFetchError,
  } = usePokemonDetail(pokemonIdOrName);

  const [isShinyDisplay, setIsShinyDisplay] = useState(false);
  const { language: currentLanguage } = usePokemonFilterStore();

  const translationWord = {
    ko: {
      backButton: '돌아가기',
      weightLabel: '몸무게',
      heightLabel: '키',
      abilitiesLabel: '특성',
      statsAnalysisLabel: '능력치 분석',
      evolutionChainLabel: '진화 과정',
      shinyMode: '이로치',
      normalMode: '일반',
    },
    en: {
      backButton: 'Back',
      weightLabel: 'Weight',
      heightLabel: 'Height',
      abilitiesLabel: 'Abilities',
      statsAnalysisLabel: 'Base Stats',
      evolutionChainLabel: 'Evolution Chain',
      shinyMode: 'Shiny',
      normalMode: 'Normal',
    },
  }[currentLanguage];

  if (isPokemonLoading) return <PokemonDetailSkeleton />;
  if (hasFetchError || !fetchedPokemon) return null;

  const pokemonMainType = fetchedPokemon.types[0].toLowerCase();
  const glowThemeColor = TYPE_GLOWS[pokemonMainType];
  const pokemonDisplayName =
    currentLanguage === 'ko' && fetchedPokemon.kr_name
      ? fetchedPokemon.kr_name
      : fetchedPokemon.name;

  return (
    <div className='min-h-screen bg-[#050505] text-white selection:bg-purple-500'>
      <Navbar />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20'>
        <Button
          variant='ghost'
          onClick={() => navigationRouter.back()}
          className='mb-8 group'
        >
          <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
          {translationWord.backButton}
        </Button>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
          <div className='lg:sticky lg:top-24'>
            <PokemonVisuals
              pokemonId={fetchedPokemon.id}
              pokemonName={fetchedPokemon.name}
              defaultImage={fetchedPokemon.image}
              glowColor={glowThemeColor}
              isShiny={isShinyDisplay}
              onToggleShiny={() => setIsShinyDisplay(!isShinyDisplay)}
              labels={{
                shiny: translationWord.shinyMode,
                normal: translationWord.normalMode,
              }}
            />
          </div>

          <div className='space-y-8'>
            <PokemonInfo
              pokemonId={fetchedPokemon.id}
              pokemonName={pokemonDisplayName}
              types={fetchedPokemon.types}
            />

            <QuickStats
              weight={fetchedPokemon.weight}
              height={fetchedPokemon.height}
              abilities={fetchedPokemon.abilities}
              labels={{
                weight: translationWord.weightLabel,
                height: translationWord.heightLabel,
                abilities: translationWord.abilitiesLabel,
              }}
            />

            <StatAnalysis
              stats={fetchedPokemon.stats}
              mainType={pokemonMainType}
              label={translationWord.statsAnalysisLabel}
            />

            <EvolutionChain
              evolutionChain={fetchedPokemon.evolutionChain ?? []}
              label={translationWord.evolutionChainLabel}
              isKorean={currentLanguage === 'ko'}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PokemonDetailClient;
