
jest.mock("@firebase/auth", () => ({
  ...jest.requireActual("@firebase/auth"),
  getReactNativePersistence: () => console.debug("Initialized persistence ..."),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("./app/components/AppContext", () => ({
  useAppContext: jest.fn(() => ({
    cart: [],
    setCart: jest.fn(),
  })),
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock('@stripe/stripe-react-native', () => 'Stripe');

jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  getFirestore: jest.fn(() => {
    console.debug("Initialized persistence ...");
    return jest.requireActual("firebase/firestore").getFirestore();
  }),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => {
    return jest.fn();
  },
}));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');