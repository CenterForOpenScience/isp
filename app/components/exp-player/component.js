import ExpPlayer from 'exp-player/components/exp-player';

export default ExpPlayer.extend({
    // Show an early exit modal (return non-empty string), but only with browser default message- don't require translation of custom text.
    messageEarlyExitModal: ' '
});
