// Lorsqu'on veut séquencer des traitements, ça ne veut pas dire séquencer les
// parties asynchrones, juste l'exploitation de leurs résultats.

async function needlesslyLongSequence(chapterURLs) {
  for (const chapterURL of chapterURLs) {
    // On attend d’avoir récupéré un chapitre pour requêter le suivant, alors
    // que ces requêtes sont indépendantes les unes des autres…
    const chapter = await fetchChapterText(chapterURL)
    appendChapterToPage(chapter)
  }
}

async function goodSequence(chapterURLs) {
  const chapterFetches = chapterURLs.map(fetchChapterText)
  // Toutes les requêtes sont initiées en amont : elles sont parallélisées.  En
  // revanche, notre boucle préserve l’ordre de définition des chapitres, pour
  // les ajouter dans l’ordre, dès qu’ils sont disponibles (et non une fois
  // qu'ils sont tous là, comme un `await Promise.all(chapterFetches)` l’aurait
  // fait).  Requêtes parallèles, mais exploitation séquentielle des résultats !
  for (const chapterFetch of chapterFetches) {
    const chapter = await chapterFetch
    appendChapterToPage(chapter)
  }
}
