const Response = ({ response }) => {
  if (!response) {
    return null;
  }

  if (response.error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-start gap-4 text-xl font-mediumbold">
        <span className="text-xl font-bold">{response.error}</span>
      </div>
    );
  }

  const flagged = response.results[0].flagged;

  const categories = [
    "sexual",
    "sexual/minors",
    "harassment",
    "harassment/threatening",
    "hate",
    "hate/threatening",
    "illicit",
    "illicit/violent",
    "self-harm",
    "self-harm/intent",
    "self-harm/instructions",
    "violence",
    "violence/graphic"
  ];

  const results = categories.map(category => {
    return {
      category,
      flagged: response.results[0].categories[category],
      score: response.results[0].category_scores[category]
    }
  })

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-4 text-xl font-mediumbold">
      <div className="w-full flex flex-row items-center justify-between">
        <span className="text-xl font-bold">Category</span>
        <span className="text-xl font-bold">Score</span>
        <span className="text-xl font-bold">Flagged</span>
      </div>
      <div className="w-full overflow-y-auto h-full flex flex-col items-center justify-start gap-4">
      {results.map(result => {
        return (
          <div key={result.category} className="w-full flex flex-row items-center justify-between">
              <span className={`w-1/5 text-base md:text-xl font-mediumbold ${result.flagged ? "text-red-500" : ""}`}>{result.category}</span>
              <span className={`w-1/3 text-base md:text-xl font-mediumbold ${result.flagged ? "text-red-500" : ""}`}>{result.score}</span>
              <span className="text-base md:text-xl font-mediumbold">{result.flagged ? "❌" : "✅"}</span>
            </div>
          )
        })}
        <div className="mt-8 w-full flex flex-row items-center justify-end gap-4">
          <span className="text-xl font-bold">Flagged</span>
          <span className="text-xl font-bold">{flagged ? "❌" : "✅"}</span>
        </div>
      </div>
    </div>
  );
};

export default Response;
