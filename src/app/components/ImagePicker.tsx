import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";

interface ImagePickerProps {
	onImageSelected?: (file: File) => void;
	buttonClassName?: string;
	iconClassName?: string;
	label?: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
	onImageSelected,
	buttonClassName = "",
	iconClassName = "",
	label = "Choose Image",
}) => {
	const [preview, setPreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
			onImageSelected?.(file);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
			}}
		>
			<input
				type="file"
				accept="image/*"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileChange}
			/>
			<button
				type="button"
				style={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
				}}
				className={buttonClassName}
				onClick={() => fileInputRef.current?.click()}
			>
				<Camera className={iconClassName} strokeWidth={2.2} aria-hidden />
				{label}
			</button>
			{preview && (
				<div>
					<img
						src={preview}
						alt="Preview"
						style={{ display: "block", maxWidth: 200, marginTop: 10 }}
					/>
				</div>
			)}
		</div>
	);
};

export default ImagePicker;
