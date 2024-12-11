import { Dialog } from '../../types/dialog';
import { FIREBASE_URLS } from '../../constants/urls';

export const janeDialog: Dialog = {
  initial: {
    messages: [
      {
        id: 'jane-1',
        text: "Hi. It's rare to meet someone here who stands out right away.",
        type: 'character'
      }
    ],
    options: [
      {
        id: 'premium-1',
        text: "You're the one who caught my attention first.",
        isPremium: true,
        cost: 10,
        relationshipPoints: 10
      },
      {
        id: 'regular-1a',
        text: "And I thought I was the lucky one to catch your attention.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      },
      {
        id: 'regular-1b',
        text: "It's mutual, believe me.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      }
    ],
    nextSectionId: 'section-2'
  },
  'section-2': {
    messages: [
      {
        id: 'jane-2',
        text: "That's a good start. But do you always come across this confident?",
        type: 'character'
      }
    ],
    options: [
      {
        id: 'premium-2',
        text: "With you, it's easy to feel confident.",
        isPremium: true,
        cost: 10,
        relationshipPoints: 10
      },
      {
        id: 'regular-2a',
        text: "Not always, but this feels different.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      },
      {
        id: 'regular-2b',
        text: "Confidence helps in the right moment.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      }
    ],
    nextSectionId: 'section-3'
  },
  'section-3': {
    messages: [
      {
        id: 'jane-3',
        text: "You know how to talk. But words aren't everything.",
        type: 'character'
      },
      {
        id: 'jane-4',
        text: "Sometimes it's just about being in the right moment, wouldn't you agree?",
        type: 'character',
        image: FIREBASE_URLS.chat.jane.photos.first
      }
    ],
    options: [
      {
        id: 'premium-3',
        text: "With you, every moment feels right.",
        isPremium: true,
        cost: 10,
        relationshipPoints: 10
      },
      {
        id: 'regular-3a',
        text: "Moments like this are rare.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      },
      {
        id: 'regular-3b',
        text: "It's all about the atmosphere.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      }
    ],
    nextSectionId: 'section-4'
  },
  'section-4': {
    messages: [
      {
        id: 'jane-5',
        text: "Maybe. But I also believe in creating the right moment.",
        type: 'character'
      },
      {
        id: 'jane-6',
        text: "I love the city at night. The lights, the sounds – it's all so alive.",
        type: 'character'
      },
      {
        id: 'jane-7',
        text: "But the best part of nights like these? Finding someone who makes them unforgettable. Think you could be that someone?",
        type: 'character',
        isAudio: true
      }
    ],
    options: [
      {
        id: 'premium-4',
        text: "I can't stop imagining that someone being you.",
        isPremium: true,
        cost: 10,
        relationshipPoints: 10
      },
      {
        id: 'regular-4a',
        text: "That's true. Company matters.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      },
      {
        id: 'regular-4b',
        text: "It's always better with someone special.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      }
    ],
    nextSectionId: 'section-5'
  },
  'section-5': {
    messages: [
      {
        id: 'jane-8',
        text: "You're making it hard not to imagine, too.",
        type: 'character'
      },
      {
        id: 'jane-9',
        text: "I love those moments when the city feels like it's holding its breath.",
        type: 'character'
      },
      {
        id: 'jane-10',
        text: "It feels like the world freezes just for you to take it in.",
        type: 'character',
        image: FIREBASE_URLS.chat.jane.photos.second
      }
    ],
    options: [
      {
        id: 'premium-5',
        text: "I'd love to see it through your eyes.",
        isPremium: true,
        cost: 15,
        relationshipPoints: 15
      },
      {
        id: 'regular-5a',
        text: "The city at night is magical.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      },
      {
        id: 'regular-5b',
        text: "You're right; it has a life of its own.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      }
    ],
    nextSectionId: 'section-6'
  },
  'section-6': {
    messages: [
      {
        id: 'jane-11',
        text: "You'd enjoy it. There's something enchanting about it.",
        type: 'character'
      },
      {
        id: 'jane-12',
        text: "But tell me, are you someone who takes risks?",
        type: 'character'
      }
    ],
    options: [
      {
        id: 'premium-6',
        text: "For you, I'd take any risk.",
        isPremium: true,
        cost: 15,
        relationshipPoints: 15
      },
      {
        id: 'regular-6a',
        text: "Sometimes, if it's worth it.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      },
      {
        id: 'regular-6b',
        text: "It depends on the situation.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      }
    ],
    nextSectionId: 'section-7'
  },
  'section-7': {
    messages: [
      {
        id: 'jane-13',
        text: "Sometimes, risks lead to the most unforgettable moments. Don't you agree?",
        type: 'character',
        isAudio: true
      }
    ],
    options: [
      {
        id: 'premium-7',
        text: "With you, every moment feels unforgettable.",
        isPremium: true,
        cost: 10,
        relationshipPoints: 10
      },
      {
        id: 'regular-7a',
        text: "Absolutely.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      },
      {
        id: 'regular-7b',
        text: "The best memories come from risks.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      }
    ],
    nextSectionId: 'section-8'
  },
  'section-8': {
    messages: [
      {
        id: 'jane-14',
        text: "You're good at keeping my attention. Let's see if you can keep it longer.",
        type: 'character'
      }
    ],
    showBlocker: true,
    nextSectionId: 'section-9'
  },
  'section-9': {
    messages: [
      {
        id: 'jane-15',
        text: "I like hearing what inspires people. What inspires you?",
        type: 'character'
      }
    ],
    options: [
      {
        id: 'premium-8',
        text: "Someone like you.",
        isPremium: true,
        cost: 15,
        relationshipPoints: 15
      },
      {
        id: 'regular-8a',
        text: "New experiences.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      },
      {
        id: 'regular-8b',
        text: "Connections with people.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      }
    ],
    nextSectionId: 'section-10'
  },
  'section-10': {
    messages: [
      {
        id: 'jane-16',
        text: "Inspiration is everywhere. You just need to know where to look.",
        type: 'character',
        image: FIREBASE_URLS.chat.jane.photos.third
      },
      {
        id: 'jane-17',
        text: "I like people who notice the little things.",
        type: 'character'
      },
      {
        id: 'jane-18',
        text: "Do you plan everything or live in the moment?",
        type: 'character'
      }
    ],
    options: [
      {
        id: 'premium-9',
        text: "With you, I'd live entirely in the moment.",
        isPremium: true,
        cost: 10,
        relationshipPoints: 10
      },
      {
        id: 'regular-9a',
        text: "A mix of both.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      },
      {
        id: 'regular-9b',
        text: "Mostly for the moment.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      }
    ],
    nextSectionId: 'section-11'
  },
  'section-11': {
    messages: [
      {
        id: 'jane-19',
        text: "Planning is overrated. Living in the moment feels right.",
        type: 'character'
      },
      {
        id: 'jane-20',
        text: "What would you do if I asked you to meet?",
        type: 'character'
      }
    ],
    options: [
      {
        id: 'premium-10',
        text: "I'd do anything to make it happen.",
        isPremium: true,
        cost: 15,
        relationshipPoints: 15
      },
      {
        id: 'regular-10a',
        text: "I'd say yes immediately.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      },
      {
        id: 'regular-10b',
        text: "I'd be there before you finished asking.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      }
    ],
    nextSectionId: 'section-12'
  },
  'section-12': {
    messages: [
      {
        id: 'jane-21',
        text: "You're keeping up so far, but don't get too comfortable. I like surprises.",
        type: 'character',
        isAudio: true
      },
      {
        id: 'jane-22',
        text: "Careful, though. I can be addictive.",
        type: 'character',
        image: FIREBASE_URLS.chat.jane.photos.fourth
      },
      {
        id: 'jane-23',
        text: "But don't worry, I'm worth it.",
        type: 'character'
      },
      {
        id: 'jane-24',
        text: "Alright. I think it's time we make this more interesting.",
        type: 'character'
      }
    ],
    options: [
      {
        id: 'premium-11',
        text: "Anything with you is interesting.",
        isPremium: true,
        cost: 15,
        relationshipPoints: 15
      },
      {
        id: 'regular-11a',
        text: "I'm all for it.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      },
      {
        id: 'regular-11b',
        text: "Tell me what you have in mind.",
        isPremium: false,
        cost: 0,
        relationshipPoints: 0
      }
    ],
    nextSectionId: 'section-13'
  },
  'section-13': {
    messages: [
      {
        id: 'jane-25',
        text: "How about this: let's meet.",
        type: 'character'
      },
      {
        id: 'jane-26',
        text: "There's a rooftop bar I like. The view is incredible at night.",
        type: 'character'
      },
      {
        id: 'jane-27',
        text: "I'll send you the location. Be there at 9. Don't disappoint me. 😉",
        type: 'character'
      }
    ],
    showDateButton: true
  }
};