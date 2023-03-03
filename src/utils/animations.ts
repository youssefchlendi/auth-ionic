import { createAnimation } from "@ionic/vue";

export const navigationAnimation = (baseEl: HTMLElement, opts:any) => {
	const { enteringEl, leavingEl } = opts;

	const enteringAnimation = createAnimation()
		.duration(500)
		.easing('cubic-bezier(0.36,0.66,0.04,1)')
		.addAnimation([
			createAnimation()
				.addElement(enteringEl)
				.fromTo('transform', 'translateX(100%)', 'translateX(0%)')
				.fromTo('opacity', '0.01', '1')
		]);

	const leavingAnimation = createAnimation()
		.duration(500)
		.easing('cubic-bezier(0.36,0.66,0.04,1)')
		.addAnimation([
			createAnimation()
				.addElement(leavingEl)
				.fromTo('transform', 'translateX(0%)', 'translateX(-100%)')
				.fromTo('opacity', '1', '0')
		]);

	return createAnimation()
		.addAnimation([enteringAnimation, leavingAnimation]);
		
}

export const goRightAnimation = (baseEl: HTMLElement, opts:any) => {
	const { enteringEl, leavingEl } = opts;

	const enteringAnimation = createAnimation()
		.duration(500)
		.easing('cubic-bezier(0.36,0.66,0.04,1)')
		.addAnimation([
			createAnimation()
				.addElement(enteringEl)
				.fromTo('opacity', '0.01', '1')
				.fromTo('transform', 'translateX(-100%)', 'translateX(0%)')
		]);

	const leavingAnimation = createAnimation()
		.duration(500)
		.easing('cubic-bezier(0.36,0.66,0.04,1)')
		.addAnimation([
			createAnimation()
				.addElement(leavingEl)
				.fromTo('transform', 'translateX(0%)', 'translateX(100%)')
				.fromTo('opacity', '1', '0')
		]);

	return createAnimation()
		.addAnimation([enteringAnimation, leavingAnimation]);
		
}

export const goLeftAnimation = (baseEl: HTMLElement, opts:any) => {
	const { enteringEl, leavingEl } = opts;

	const enteringAnimation = createAnimation()
		.duration(500)
		.easing('cubic-bezier(0.36,0.66,0.04,1)')
		.addAnimation([
			createAnimation()
				.addElement(enteringEl)
				.fromTo('opacity', '0.01', '1')
				.fromTo('transform', 'translateX(100%)', 'translateX(0%)')
		]);

	const leavingAnimation = createAnimation()
		.duration(500)
		.easing('cubic-bezier(0.36,0.66,0.04,1)')
		.addAnimation([
			createAnimation()
				.addElement(leavingEl)
				.fromTo('transform', 'translateX(0%)', 'translateX(-100%)')
				.fromTo('opacity', '1', '0')
		]);

	return createAnimation()
		.addAnimation([enteringAnimation, leavingAnimation]);
		
}

export const forwardAnimation = (baseEl: HTMLElement, opts:any) => {
	const { enteringEl, leavingEl } = opts;

	const enteringAnimation = createAnimation()
		.duration(500)
		.easing('cubic-bezier(0.36,0.66,0.04,1)')
		.addAnimation([
			createAnimation()
				.addElement(enteringEl)
				.fromTo('transform', 'translateY(100%)', 'translateY(0%)')
				.fromTo('opacity', '0.01', '1')
		]);

	const leavingAnimation = createAnimation()
		.duration(500)
		.easing('cubic-bezier(0.36,0.66,0.04,1)')
		.addAnimation([
			createAnimation()
				.addElement(leavingEl)
				.fromTo('transform', 'translateY(0%)', 'translateY(-100%)')
				.fromTo('opacity', '1', '0')
		]);

	return createAnimation()
		.addAnimation([enteringAnimation, leavingAnimation]);
		
}
