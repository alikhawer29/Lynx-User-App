// styles.js
import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../utils/colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 20,
    color: '#22282C',
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  controlButton: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  controlText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  faqItem: {
    marginBottom: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    paddingRight: 16,
  },
  questionContainer: {
    flex: 1,
    marginRight: 12,
  },
  faqQuestion: {
    color: colors.black,
    lineHeight: 22,
    flexShrink: 1,
  },
  iconWrapper: {
    padding: 4,
    marginLeft: 8,
  },
  // iconContainer: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  iconLine: {
    height: 2,
    position: 'absolute',
    borderRadius: 1,
  },
  faqAnswerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: colors.light_gray,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.dark_gray,
    paddingTop: 12,
  },
  imageContainer: {
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  faqImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  videoContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: colors.light_gray,
    borderRadius: 8,
  },
  videoText: {
    fontSize: 14,
    color: colors.dark_gray,
    fontWeight: '500',
  },
  videoLink: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
    fontStyle: 'italic',
  },
  noAnswerText: {
    fontSize: 14,
    color: colors.dark_gray,
    fontStyle: 'italic',
    paddingTop: 12,
    textAlign: 'center',
  },
  noContentContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noContentText: {
    textAlign: 'center',
    color: colors.dark_gray,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  noContentSubText: {
    textAlign: 'center',
    color: colors.gray,
    fontSize: 14,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  arrowLine: {
    borderRadius: 1,
  },
});

export default styles;
