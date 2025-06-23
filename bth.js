 function showContent(id) {
      document.getElementById('british').style.display = 'none';
      document.getElementById('american').style.display = 'none';
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.getElementById(id).style.display = 'block';
      document.querySelector('.tab[onclick*="' + id + '"]').classList.add('active');
    }

    let correct = localStorage.getItem('correct') || 0;
    let total = localStorage.getItem('total') || 0;
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('totalCount').textContent = total;

    function checkAnswer() {
      const input = document.getElementById('answerInput').value.trim().toLowerCase();
      let correctWords = ['colour', 'centre', 'organise'];
      let isCorrect = correctWords.includes(input);

      total++;
      if (isCorrect) correct++;

      localStorage.setItem('correct', correct);
      localStorage.setItem('total', total);

      document.getElementById('correctCount').textContent = correct;
      document.getElementById('totalCount').textContent = total;

      document.getElementById('resultText').textContent =
        isCorrect ? '✅ Correct!' : '❌ Try again! That’s not British spelling.';
    }

    function speakWord(accent) {
      const word = document.getElementById('voiceInput').value.trim();
      if (!word) {
        alert("Please type a word to pronounce.");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = accent;
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }

    function speakCustom(inputId, accent) {
      const word = document.getElementById(inputId).value.trim();
      if (!word) {
        alert("Please enter a word.");
        return;
      }
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = accent;
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
    
  async function getTranscription() {
    const word = document.getElementById('transcriptionInput').value.trim().toLowerCase();
    const output = document.getElementById('transcriptionResult');
    output.innerHTML = "Loading...";

    if (!word) {
      output.innerHTML = "❌ Please enter a word.";
      return;
    }

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();

      if (data.title === "No Definitions Found") {
        output.innerHTML = "❌ Word not found. Try another.";
        return;
      }

      const phonetic = data[0].phonetics.find(p => p.text);
      if (phonetic && phonetic.text) {
        output.innerHTML = `Phonetic transcription of <strong>${word}</strong>:<br><span style="font-size: 28px;">${phonetic.text}</span>`;
      } else {
        output.innerHTML = "❌ Transcription not available.";
      }
    } catch (error) {
      output.innerHTML = "❌ Error fetching transcription.";
    }
  }

  function speakTranscribedWord(accent) {
    const word = document.getElementById('transcriptionInput').value.trim();
    if (!word) {
      alert("Please enter a word to pronounce.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = accent;
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }