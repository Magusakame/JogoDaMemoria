
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ImageBackgroundBase, ImageBackground } from 'react-native';
import Card from './Card';

const icons = ['star', 'heart', 'smile-o', 'apple', 'diamond', 'music'];

type CardType = { value: string; isFlipped: boolean; id: number };
type CardsArrayType = CardType[];

const backgroundImage = require('./imagens/fundo.png');

const Joguinho = () => {
  const [cards, setCards] = useState<CardsArrayType>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledIcons = [...icons, ...icons].sort(() => Math.random() - 0.5);
    setCards(
      shuffledIcons.map((value, index) => ({
        value,
        isFlipped: false,
        id: index,
      }))
    );
    setFlipped([]);
    setSolved([]);
    setAttempts(0);
  };

  const handleCardPress = (cardId: number) => {
    if (flipped.length === 2 || solved.includes(cardId)) {
      return;
    }

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstCard, secondCard] = newFlipped;
      if (cards[firstCard].value === cards[secondCard].value) {
        setSolved([...solved, firstCard, secondCard]);
      }
      setAttempts(attempts + 1);

      setTimeout(() => {
        setFlipped([]);
      }, 1000);
    }
  };

  const GameOver = solved.length === cards.length;

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            value={card.value}
            isFlipped={flipped.includes(index) || solved.includes(card.id)}
            onPress={() => handleCardPress(card.id)}
          />
        ))}
        {GameOver && (
          <View style={styles.congratulations}>
            <Text>Parabéns, você venceu - {attempts} jogadas.</Text>
            <Button title="Jogar Novamente" onPress={initializeGame} />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  congratulations: {
    position: 'absolute',
    top: '40%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Joguinho;
