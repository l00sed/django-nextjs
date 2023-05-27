from django import forms
from .models import Comment


class CommentForm(forms.Form):
    """Comment Form."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ""  # Removes : as label suffix

    # Hidden Fields
    cid = forms.IntegerField(
        initial=None,
        widget=forms.HiddenInput()
    )
    parent = forms.IntegerField(
        initial=0,
        widget=forms.HiddenInput()
    )
    article = forms.SlugField(
        widget=forms.HiddenInput()
    )
    reply_level = forms.IntegerField(
        widget=forms.HiddenInput()
    )

    # Visible Fields
    author = forms.CharField(
        label="",
        max_length=200,
        initial="Anonymous",
        widget=forms.TextInput(
            attrs={
                "placeholder": "Name"
            }
        )
    )
    content = forms.CharField(
        label="",
        max_length=2000,
        initial="",
        widget=forms.Textarea(
            attrs={
                "placeholder": "Message or reply"
            }
        )
    )
    subscribe = forms.BooleanField(
        label="Subscribe to this discussion?",
        initial=False,
        required=False,
        widget=forms.CheckboxInput()
    )

    # Conditional on subscribe checkbox
    email = forms.EmailField(
        label="",
        max_length=254,
        required=True,
        widget=forms.EmailInput(
            attrs={
                "style": "display: none;",
                "placeholder": "Email"
            }
        )
    )

    template = "backend/form.html"

    def clean(self):
        data = self.cleaned_data
        if data.get('subscribe', True) and data.get('email', None):
            raise forms.ValidationError(
                "An email address is required in order "
                "to subscribe to the discussion."
            )
        else:
            return data
