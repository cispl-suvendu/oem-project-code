type ModalState = {
    isModalOpen: boolean;
    isAddOpen: boolean;
    isEditOpen: boolean;
    isDeleteOpen: boolean;
    titleText: string;
    data?: object;
};

type Action =
    | { type: 'OPEN_MODAL'; payload: { mode: 'add' | 'edit', title: string, data?: object } }
    | { type: 'DELETE_MODAL'; }
    | { type: 'CLOSE_MODAL' };

export const initialState: ModalState = {
    isModalOpen: false,
    isAddOpen: false,
    isEditOpen: false,
    isDeleteOpen: false,
    titleText: '',
    data: undefined,
};

export const modalReducer = (state: ModalState, action: Action): ModalState => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                isModalOpen: true,
                isAddOpen: action.payload.mode === 'add',
                isEditOpen: action.payload.mode === 'edit',
                titleText: action.payload.title,
                data: action.payload.data,
            };
        case 'DELETE_MODAL':
            return {
                ...state,
                isModalOpen: true,
                titleText: "Confirm Deletion",
                isDeleteOpen: true,
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                isModalOpen: false,
                isAddOpen: false,
                isEditOpen: false,
                isDeleteOpen:false
            };
        default:
            return state;
    }
};