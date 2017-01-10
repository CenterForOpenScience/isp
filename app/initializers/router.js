// h/t http://stackoverflow.com/questions/18302463/get-current-route-name-in-ember

export function initialize(application) {
  application.inject('controller', 'router', 'router:main');
}

export default {
  name: 'router',
  initialize
};
