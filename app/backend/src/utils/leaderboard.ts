import IMatch from '../interfaces/IMatch';

const calculateVictories = (matches: IMatch[], teamId: number): number => {
  const victories = matches.reduce((acc, match) => {
    if (
      match.homeTeam === teamId
      && match.homeTeamGoals > match.awayTeamGoals
    ) {
      return acc + 1;
    }

    if (
      match.awayTeam === teamId
      && match.awayTeamGoals > match.homeTeamGoals
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return victories;
};

const calculateDraws = (matches: IMatch[], teamId: number): number => {
  const draws = matches.reduce((acc, match) => {
    if (
      match.homeTeam === teamId
      && match.homeTeamGoals === match.awayTeamGoals
    ) {
      return acc + 1;
    }

    if (
      match.awayTeam === teamId
      && match.awayTeamGoals === match.homeTeamGoals
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return draws;
};

const calculateLosses = (matches: IMatch[], teamId: number) => {
  const losses = matches.reduce((acc, match) => {
    if (
      match.homeTeam === teamId
      && match.homeTeamGoals < match.awayTeamGoals
    ) {
      return acc + 1;
    }

    if (
      match.awayTeam === teamId
      && match.awayTeamGoals < match.homeTeamGoals
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return losses;
};

const calculateGames = (matches: IMatch[], teamId: number): number => {
  const games = matches.reduce((acc, match) => {
    if (match.homeTeam === teamId || match.awayTeam === teamId) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return games;
};

const calculateGoalsFavor = (matches: IMatch[], teamId: number): number => {
  const goalsFavor = matches.reduce((acc, match) => {
    if (match.homeTeam === teamId) {
      return acc + match.homeTeamGoals;
    }

    if (match.awayTeam === teamId) {
      return acc + match.awayTeamGoals;
    }

    return acc;
  }, 0);

  return goalsFavor;
};

const calculateGoalsOwn = (matches: IMatch[], teamId: number): number => {
  const goalsOwn = matches.reduce((acc, match) => {
    if (match.homeTeam === teamId) {
      return acc + match.awayTeamGoals;
    }

    if (match.awayTeam === teamId) {
      return acc + match.homeTeamGoals;
    }

    return acc;
  }, 0);

  return goalsOwn;
};

const calculateEfficiency = (matches: IMatch[], teamId: number): string => {
  const totalVictories = calculateVictories(matches, teamId);
  const totalDraws = calculateDraws(matches, teamId);
  const totalPoints = totalVictories * 3 + totalDraws * 1;
  const totalGames = calculateGames(matches, teamId);

  const efficiency = (totalPoints / (totalGames * 3)) * 100;

  return efficiency.toFixed(2);
};

const generateLeaderboard = (matches: IMatch[], teamId: number) => {
  const totalVictories = calculateVictories(matches, teamId);
  const totalDraws = calculateDraws(matches, teamId);
  const totalGames = calculateGames(matches, teamId);
  const totalLosses = calculateLosses(matches, teamId);
  const goalsFavor = calculateGoalsFavor(matches, teamId);
  const goalsOwn = calculateGoalsOwn(matches, teamId);
  const efficiency = calculateEfficiency(matches, teamId);

  return {
    totalPoints: totalVictories * 3 + totalDraws * 1,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency,
  };
};

export default generateLeaderboard;
