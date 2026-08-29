import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator/Separator';

import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	appliedSettings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	appliedSettings,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	// Состояние формы (черновик)
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(appliedSettings);
	// Состояние открытия/закрытия сайдбара
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const sidebarRef = useRef<HTMLDivElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(target) &&
				arrowButtonRef.current &&
				!arrowButtonRef.current.contains(target)
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isSidebarOpen]);

	// Переключение сайдбара
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	// Применение настроек
	const handleApply = () => {
		onApply(formSettings);
		setIsSidebarOpen(false);
	};

	// Сброс настроек
	const handleReset = () => {
		setFormSettings(defaultArticleState);
		onReset();
		setIsSidebarOpen(false);
	};

	// Обработчики изменения полей
	const handleFontFamilyChange = (selected: OptionType) => {
		setFormSettings({ ...formSettings, fontFamilyOption: selected });
	};

	const handleFontSizeChange = (selected: OptionType) => {
		setFormSettings({ ...formSettings, fontSizeOption: selected });
	};

	const handleFontColorChange = (selected: OptionType) => {
		setFormSettings({ ...formSettings, fontColor: selected });
	};

	const handleBackgroundColorChange = (selected: OptionType) => {
		setFormSettings({ ...formSettings, backgroundColor: selected });
	};

	const handleContentWidthChange = (selected: OptionType) => {
		setFormSettings({ ...formSettings, contentWidth: selected });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleApply();
	};

	const handleResetForm = (e: React.FormEvent) => {
		e.preventDefault();
		handleReset();
	};

	return (
		<>
			<div ref={arrowButtonRef}>
				<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			</div>

			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleResetForm}>
					<div className={styles.fields}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formSettings.fontFamilyOption}
							onChange={handleFontFamilyChange}
						/>

						<Separator />

						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formSettings.fontSizeOption}
							onChange={handleFontSizeChange}
						/>

						<Separator />

						<Select
							title='Цвет текста'
							options={fontColors}
							selected={formSettings.fontColor}
							onChange={handleFontColorChange}
						/>

						<Separator />

						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formSettings.backgroundColor}
							onChange={handleBackgroundColorChange}
						/>

						<Separator />

						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formSettings.contentWidth}
							onChange={handleContentWidthChange}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
