import { useRef, useEffect } from 'react';
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
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	settings: ArticleStateType;
	onSettingsChange: (settings: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
	isSidebarOpen: boolean;
	onToggleSidebar: () => void;
	onCloseSidebar: () => void;
};

export const ArticleParamsForm = ({
	settings,
	onSettingsChange,
	onApply,
	onReset,
	isSidebarOpen,
	onToggleSidebar,
	onCloseSidebar,
}: ArticleParamsFormProps) => {
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Закрытие по клику вне сайдбара
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isSidebarOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				onCloseSidebar();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen, onCloseSidebar]);

	// Закрытие по Escape
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isSidebarOpen) {
				onCloseSidebar();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isSidebarOpen, onCloseSidebar]);

	// Обработчики изменения полей
	const handleFontFamilyChange = (selected: OptionType) => {
		onSettingsChange({ ...settings, fontFamilyOption: selected });
	};

	const handleFontSizeChange = (selected: OptionType) => {
		onSettingsChange({ ...settings, fontSizeOption: selected });
	};

	const handleFontColorChange = (selected: OptionType) => {
		onSettingsChange({ ...settings, fontColor: selected });
	};

	const handleBackgroundColorChange = (selected: OptionType) => {
		onSettingsChange({ ...settings, backgroundColor: selected });
	};

	const handleContentWidthChange = (selected: OptionType) => {
		onSettingsChange({ ...settings, contentWidth: selected });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply();
	};

	const handleResetForm = (e: React.FormEvent) => {
		e.preventDefault();
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={onToggleSidebar} />

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
							selected={settings.fontFamilyOption}
							onChange={handleFontFamilyChange}
						/>

						<Separator />

						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={settings.fontSizeOption}
							onChange={handleFontSizeChange}
						/>

						<Separator />

						<Select
							title='Цвет текста'
							options={fontColors}
							selected={settings.fontColor}
							onChange={handleFontColorChange}
						/>

						<Separator />

						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={settings.backgroundColor}
							onChange={handleBackgroundColorChange}
						/>

						<Separator />

						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={settings.contentWidth}
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
